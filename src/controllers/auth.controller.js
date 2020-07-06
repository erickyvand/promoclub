import UserService from '../services/user.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';
import SendEmailService from '../services/send-email.service';
import { emailBody } from '../helpers/mails/email.body';

class AuthController {
	static async signup(req, res) {
		const newUser = await UserService.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
		});

		ResponseService.setSuccess(201, 'Created', {
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

	static async login(req, res) {
		const user = await UserService.findByProperty({
			email: req.body.email,
		});

		ResponseService.setSuccess(200, 'You are successfully logged in', {
			token: TokenService.generateToken({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}),
		});
		return ResponseService.send(res);
	}

	static async loginWithSocialMedias(req, res) {
		const user = await UserService.findByProperty({ email: req.user.email });
		ResponseService.setSuccess(200, 'You are successfully logged in', {
			token: TokenService.generateToken({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}),
		});
		return ResponseService.send(res);
	}

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

	static async ResetPassword(req, res) {
		await UserService.updateProperty(
			{ email: req.userData.email },
			{ password: BcryptService.hashPassword(req.body.password) }
		);
		ResponseService.setSuccess(200, 'Password reset was success');
		return ResponseService.send(res);
	}

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
}

export default AuthController;
