import express from 'express';
import NotificationController from '../controllers/notification.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import { validateNotificationUrlParam } from '../validations/notification.validation';
import { checkNotificationExists } from '../middlewares/notification.middleware';

const router = express.Router();

router.get('/', allowAssessRoute, NotificationController.getNofitications);
router.patch(
	'/:notificationId/read',
	allowAssessRoute,
	validateNotificationUrlParam,
	checkNotificationExists,
	NotificationController.readNotification
);
router.patch(
	'/mark-as-read',
	allowAssessRoute,
	NotificationController.markNotificationAsRead
);

router.get('/count', allowAssessRoute, NotificationController.countUnreadNotifications);

export default router;
