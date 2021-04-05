import Joi from 'joi';
import ResponseService from '../services/response.service';

// eslint-disable-next-line import/prefer-default-export
export const validateNotificationUrlParam = (req, res, next) => {
	const schema = Joi.object({
		notificationId: Joi.string()
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
