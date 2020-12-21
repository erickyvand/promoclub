const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * Notification model class
	 */
	class Notification extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			Notification.belongsTo(models.Post, {
				foreignKey: 'postId',
				targetKey: 'id',
			});
			Notification.belongsTo(models.User, {
				foreignKey: 'recipientId',
				targetKey: 'id',
			});
		}
	}
	Notification.init(
		{
			senderId: DataTypes.INTEGER,
			recipientId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			read: DataTypes.BOOLEAN,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Notification',
		}
	);
	return Notification;
};
