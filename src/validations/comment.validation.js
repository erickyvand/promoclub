import Joi from 'joi';
import ResponseService from '../services/response.service';

export const validatePostComment = (req, res, next) => {
	const schema = Joi.object({
		comment: Joi.string().required().messages({
			'any.required': 'Comment is required',
			'string.empty': 'Comment is not allowed to be empty',
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

export const validateUrlIds = (req, res, next) => {
	const schema = Joi.object({
		postId: Joi.string()
			.regex(/^[0-9]{1,}$/)
			.messages({
				'string.pattern.base': 'Post id must be a number',
			}),
		commentId: Joi.string()
			.regex(/^[0-9]{1,}$/)
			.messages({
				'string.pattern.base': 'comment id must be a number',
			}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.params);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	next();
};
