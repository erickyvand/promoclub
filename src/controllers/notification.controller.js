import NotificationService from '../services/notification.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

/**
 * Notification class controller
*/
class NotificationController {
	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to get a notification
	 */
	static async getNofitications(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await NotificationService.getAllNofications(
			{ recipientId: req.userData.id },
			{ offset, limit },
		);
		ResponseService.setSuccess(200, 'All Recipient Notifications', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: results.rows,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to read notication
	 */
	static async readNotification(req, res) {
		const read = await NotificationService.makeRead(
			{ id: parseInt(req.params.notificationId) },
			{ read: true },
		);
		ResponseService.setSuccess(
			200,
			'Notification was read',
			read[1][0].dataValues,
		);
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to mark notification as read
	 */
	static async markNotificationAsRead(req, res) {
		const read = await NotificationService.markAsRead(
			{ recipientId: req.userData.id },
			{ read: true },
		);
		ResponseService.setSuccess(200, 'Notifications marked as read', read);
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to count unread notication
	 */
	static async countUnreadNotifications(req, res) {
		const notifications = await NotificationService.countNotifications({
			read: false,
		});
		ResponseService.setSuccess(200, 'All unread notifications', notifications);
		return ResponseService.send(res);
	}
}

export default NotificationController;
