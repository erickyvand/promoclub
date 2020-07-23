import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller';
import {
	validateSignup,
	validateLogin,
	validateUserEmail,
	validateUserResetPassword,
	validateProfileInfo,
} from '../validations/user.validation';
import {
	checkUserExists,
	loginUser,
	checkUserEmailExists,
	allowAssessRoute,
	checkUserOwnProfile,
	findUser,
} from '../middlewares/user.middleware';

const router = express.Router();

router.post('/signup', validateSignup, checkUserExists, AuthController.signup);
router.post('/login', validateLogin, loginUser, AuthController.login);
router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
	'/google/redirect',
	passport.authenticate('google', {
		session: false,
		failureRedirect: '/login',
	}),
	AuthController.loginWithSocialMedias
);
router.get('/facebook', passport.authenticate('facebook'));
router.get(
	'/facebook/redirect',
	passport.authenticate('facebook', {
		session: false,
		failureRedirect: '/login',
	}),
	AuthController.loginWithSocialMedias
);
router.post(
	'/search-account',
	validateUserEmail,
	checkUserEmailExists,
	AuthController.SearchAccount
);
router.patch(
	'/reset-password',
	allowAssessRoute,
	validateUserResetPassword,
	AuthController.ResetPassword
);
router.get(
	'/profile/:id',
	allowAssessRoute,
	validateProfileInfo,
	findUser,
	AuthController.viewProfile
);

router.patch(
	'/edit-profile/:id',
	allowAssessRoute,
	validateProfileInfo,
	checkUserOwnProfile,
	AuthController.editUserProfile
);

export default router;
