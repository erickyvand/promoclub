import Joi from 'joi';
import ResponseService from '../services/response.service';

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function validates signup body fields
 */
export const validateSignup = (req, res, next) => {
	const signupSchema = Joi.object({
		firstName: Joi.string().trim().required().min(2).messages({
			'any.required': 'First Name is required',
			'string.empty': 'First Name is not allowed to be empty',
			'string.min': 'First Name length must be at least 2 characters long',
		}),
		lastName: Joi.string().trim().required().min(2).messages({
			'any.required': 'Last Name is required',
			'string.empty': 'Last Name is not allowed to be empty',
			'string.min': 'Last Name length must be at least 2 characters long',
		}),
		email: Joi.string().trim().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
			'string.empty': 'Email is not allowed to be empty',
		}),
		password: Joi.string().trim().required().min(6).messages({
			'any.required': 'Password is required',
			'string.min': 'Password length must be at least 6 characters long',
			'string.empty': 'Password is not allowed to be empty',
		}),
		confirmPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.messages({
				'any.required': 'Confirm Password is required',
				'any.only': 'Passwords must match',
				'string.empty': 'Confirm Password is not allowed to be empty',
			}),
	}).options({ abortEarly: false });

	const { error } = signupSchema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};

/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function validates login body fields
 */
export const validateLogin = (req, res, next) => {
	const loginSchama = Joi.object({
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
			'string.empty': 'Email is not allowed to be empty',
		}),
		password: Joi.string().required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password is not allowed to be empty',
		}),
	}).options({ abortEarly: false });

	const { error } = loginSchama.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {function} next
 * @returns {object} this function validate user email
 */
export const validateUserEmail = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.empty': 'Email is not allowed to be empty',
			'string.email': 'Email must be a valid email',
		}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};

export const validateUserResetPassword = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().min(6).required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password is not allowed to be empty',
			'string.min': 'Password length must be at least 6 characters long',
		}),
		confirmPassword: Joi.string()
			.required()
			.valid(Joi.ref('password'))
			.messages({
				'any.required': 'Confirm Password is required',
				'string.empty': 'Confirm Password is not allowed to be empty',
				'any.only': 'Passwords must match',
			}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};

export const validateProfileInfo = (req, res, next) => {
	const schema = Joi.object({
		id: Joi.string()
			.regex(/^[0-9]{1,}$/)
			.messages({
				'string.pattern.base': 'Id must be a number',
			}),
	});

	const { error } = schema.validate(req.params);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};
