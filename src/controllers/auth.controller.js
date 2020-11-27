import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';
import SendEmailService from '../services/send-email.service';
import { emailBody } from '../helpers/mails/email.body';
import cloudinary from '../helpers/cloudinary.helper';

/**
 * Auth controller class
 */
class AuthController {
	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function signup a user
	 */
	static async signup(req, res) {
		const newUser = await UserService.createUser({
			firstName: `${req.body.firstName
				.charAt(0)
				.toUpperCase()}${req.body.firstName.slice(1)}`,
			lastName: `${req.body.lastName
				.charAt(0)
				.toUpperCase()}${req.body.lastName.slice(1)}`,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
		});

		ResponseService.setSuccess(201, 'You account has been created', {
			id: newUser.id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			role: newUser.role,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function login a user
	 */
	static async login(req, res) {
		const user = await UserService.findByProperty({
			email: req.body.email,
		});

		const userData = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		ResponseService.setSuccess(200, 'You are successfully logged in', {
			token: TokenService.generateToken(userData),
			user: userData,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function login a user with social medias
	 */
	static async loginWithSocialMedias(req, res) {
		const user = await UserService.findByProperty({ email: req.user.email });
		const token = TokenService.generateToken({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
		return res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function search a user account
	 */
	static async SearchAccount(req, res) {
		const token = TokenService.generateToken({ email: req.body.email });
		SendEmailService.sendEmailToUser(
			req.body.email,
			'Reset your password',
			emailBody(token)
		);
		ResponseService.setSuccess(200, 'Email sent to you for verification');
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function reset a user account password
	 */
	static async ResetPassword(req, res) {
		await UserService.updateProperty(
			{ email: req.userData.email },
			{ password: BcryptService.hashPassword(req.body.password) }
		);
		ResponseService.setSuccess(200, 'Password reset was success');
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function show a user profile
	 */
	static async viewProfile(req, res) {
		const user = await UserService.findByProperty({
			id: parseInt(req.params.id),
		});
		ResponseService.setSuccess(200, 'Success', {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			address: user.address,
			profilePicture: user.profilePicture,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function edit a user profile
	 */
	static async editUserProfile(req, res) {
		req.files.profilePicture.mv(
			`./src/public/${req.files.profilePicture.name}`
		);

		const file = await cloudinary.uploader.upload(
			`./src/public/${req.files.profilePicture.name}`,
			{ resource_type: 'auto' }
		);

		const id = parseInt(req.params.id);
		await UserService.updateProperty(
			{ id },
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				dateOfBirth: req.body.dateOfBirth,
				address: req.body.address,
				profilePicture: req.files.profilePicture.name && file.secure_url,
			}
		);

		const {
			firstName,
			lastName,
			dateOfBirth,
			address,
			profilePicture,
			createdAt,
			updatedAt,
		} = await UserService.findByProperty({ id });

		ResponseService.setSuccess(200, 'Profile has been updated', {
			firstName,
			lastName,
			dateOfBirth,
			address,
			profilePicture,
			createdAt,
			updatedAt,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} this function shwo all users
	 */
	static async getUsers(req, res) {
		const usersData = await UserService.findAllUsers();
		const users = usersData.map(userData => {
			return {
				id: userData.id,
				firstName: userData.firstName,
				lastName: userData.lastName,
				profilePicture: userData.profilePicture,
			};
		});
		ResponseService.setSuccess(200, 'All users', users);
		return ResponseService.send(res);
	}
}

export default AuthController;
