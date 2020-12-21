import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import { getGoogleProfileUserInfo, getFacebookProfileUserInfo } from '../middlewares/user.middleware';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/api/auth/google/redirect',
		},
		getGoogleProfileUserInfo,
	),
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
			callbackURL: '/api/auth/facebook/redirect',
			scope: ['public_profile', 'email'],
			profileFields: ['id', 'email', 'name', 'photos'],
		},
		getFacebookProfileUserInfo,
	),
);
