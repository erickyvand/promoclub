import models from '../models';

const { Notification, User } = models;

/**
 * Notification service class
 */
class NotificationService {
	/**
	 * @param  {object} notification
	 * @returns {object} function to create a notification
	 */
	static createNotification(notification) {
		return Notification.create(notification);
	}

	/**
	 * @param  {object} property
	 * @param  {integer} {offset
	 * @param  {integer} limit}
	 * @returns {object} function to get all notifications
	 */
	static getAllNofications(property, { offset, limit }) {
		return Notification.findAndCountAll({
			where: property,
			order: [['id', 'DESC']],
			include: {
				model: User,
				attributes: ['id', 'firstName', 'lastName'],
			},
			offset,
			limit,
		});
	}

	/**
	 * @param  {object} property
	 * @returns {object} function to get a notification
	 */
	static findNotification(property) {
		return Notification.findOne({ where: property });
	}

	/**
	 * @param  {object} notificationId
	 * @param  {object} property
	 * @returns {object} function to make notification as read
	 */
	static makeRead(notificationId, property) {
		return Notification.update(property, {
			where: notificationId,
			returning: true,
		});
	}

	/**
	 * @param  {object} recipientId
	 * @param  {object} property
	 * @returns {object} function to make notification as read
	 */
	static markAsRead(recipientId, property) {
		return Notification.update(property, {
			where: recipientId,
			returning: true,
		});
	}

	/**
	 * @param  {object} property
	 * @returns {object} function to delete a notification
	 */
	static removeNotification(property) {
		return Notification.destroy({ where: property });
	}

	/**
	 * @param  {object} property
	 * @returns {object} function to count notifications
	 */
	static countNotifications(property) {
		return Notification.findAll({ where: property });
	}
}

export default NotificationService;
