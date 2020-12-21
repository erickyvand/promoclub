import Joi from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';

const JoiDate = Joi.extend(joiDate);

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {funcion} next
 * @returns {object} this function check if user exits in database
 */
export async function checkUserExists(req, res, next) {
	const user = await UserService.findByProperty({ email: req.body.email });

	if (user) {
		ResponseService.setError(
			409,
			'Email already taken, please choose another email',
		);
		return ResponseService.send(res);
	}
	next();
}
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check user authentication login
 */
export const loginUser = async (req, res, next) => {
	const user = await UserService.findByProperty({
		email: req.body.email,
	});
	if (!user) {
		ResponseService.setError(401, 'Invalid email or password');
		return ResponseService.send(res);
	}

	if (!BcryptService.comparePassword(req.body.password, user.password)) {
		ResponseService.setError(401, 'Invalid email or password');
		return ResponseService.send(res);
	}
	next();
};

/**
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {object} profile
 * @param  {function} done
 * @returns {object} this function get profile for a google user, and create a user if not exits
 */
export async function getGoogleProfileUserInfo(
	accessToken,
	refreshToken,
	profile,
	done,
) {
	const user = await UserService.findByProperty({ email: profile._json.email });

	const newUser = {
		firstName: profile._json.given_name,
		lastName: profile._json.family_name,
		email: profile._json.email,
		password: BcryptService.hashPassword(Math.random().toString(36)),
	};
	if (!user) {
		await UserService.createUser(newUser);
	}
	done(null, newUser);
}

/**
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {object} profile
 * @param  {function} done
 * @returns {object} this function get profile for a facebook user, and create a user if not exits
 */
export async function getFacebookProfileUserInfo(
	accessToken,
	refreshToken,
	profile,
	done,
) {
	const user = await UserService.findByProperty({ email: profile._json.email });

	const newUser = {
		firstName: profile._json.first_name,
		lastName: profile._json.last_name,
		email: profile._json.email,
		password: BcryptService.hashPassword(Math.random().toString(36)),
	};

	if (!user) {
		await UserService.createUser(newUser);
	}
	done(null, newUser);
}

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check if user account exists.
 */
export async function checkUserEmailExists(req, res, next) {
	const user = await UserService.findByProperty({ email: req.body.email });

	if (!user) {
		ResponseService.setError(
			404,
			'Results not found, make sure you have an account',
		);
		return ResponseService.send(res);
	}
	next();
}

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function to protect route.
 */
export const allowAssessRoute = (req, res, next) => {
	const bearerHeader = req.headers.authorization;

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		const { name } = TokenService.verifyToken(req.token);

		if (name === 'JsonWebTokenError') {
			ResponseService.setError(401, 'Unauthorized, invalid token');
			return ResponseService.send(res);
		}

		if (name === 'TokenExpiredError') {
			ResponseService.setError(
				401,
				'Unauthorized, Token has expired signin again to get new token',
			);
			return ResponseService.send(res);
		}
		req.userData = TokenService.verifyToken(req.token);
		next();
	} else {
		ResponseService.setError(
			403,
			'You can not proceed without setting authorization token',
		);
		return ResponseService.send(res);
	}
};

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check if a user.
 */
export async function findUser(req, res, next) {
	const user = await UserService.findByProperty({
		id: parseInt(req.params.id),
	});
	if (!user) {
		ResponseService.setError(404, 'No user profile found');
		return ResponseService.send(res);
	}
	next();
}

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function check user own profile.
 */
export async function checkUserOwnProfile(req, res, next) {
	if (req.userData.id !== parseInt(req.params.id)) {
		ResponseService.setError(
			401,
			'Unauthorized, make sure you have a valid token or it is your profile',
		);
		return ResponseService.send(res);
	}

	const schema = Joi.object({
		firstName: Joi.string().min(2).messages({
			'string.empty': 'First Name is not allowed to be empty',
			'string.min': 'First Name length must be at least 2 characters long',
		}),
		lastName: Joi.string().min(2).messages({
			'string.empty': 'Last Name is not allowed to be empty',
			'string.min': 'Last Name length must be at least 2 characters long',
		}),
		dateOfBirth: JoiDate.date().max('now').utc().format('YYYY-MM-DD')
			.messages({
				'date.format': 'Date must be in YYYY-MM-DD format',
				'date.max':
				'Date of Birth must be less than or equal to the current date',
			}),
		address: Joi.string().min(4).messages({
			'string.empty': 'Address is not allowed to be empty',
			'string.min': 'Address length must be at least 4 characters long',
		}),
		profilePicture: Joi.string(),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}

	if (!req.files) {
		const id = parseInt(req.params.id);
		await UserService.updateProperty(
			{ id },
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				dateOfBirth: req.body.dateOfBirth,
				address: req.body.address,
			},
		);
		const {
			firstName,
			lastName,
			dateOfBirth,
			address,
			createdAt,
			updatedAt,
		} = await UserService.findByProperty({ id });

		ResponseService.setSuccess(200, 'Profile has been updated', {
			firstName,
			lastName,
			dateOfBirth,
			address,
			createdAt,
			updatedAt,
		});
		return ResponseService.send(res);
	}
	const { profilePicture } = req.files;
	if (
		profilePicture.mimetype !== 'image/jpg'
			&& profilePicture.mimetype !== 'image/jpeg'
			&& profilePicture.mimetype !== 'image/png'
	) {
		ResponseService.setError(400, 'Only jpg, jpeg, png files are allowed');
		return ResponseService.send(res);
	}

	if (profilePicture.size > 5000000) {
		ResponseService.setError(400, 'Picture size must not exceed 5MB');
		return ResponseService.send(res);
	}

	next();
}
