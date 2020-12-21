const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * User model class
	 */
	class User extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Post, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Comment, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Notification, {
				foreignKey: 'recipientId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Like, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			User.hasMany(models.Unlike, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	User.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			dateOfBirth: DataTypes.DATE,
			address: DataTypes.STRING,
			profilePicture: DataTypes.STRING,
			role: DataTypes.ENUM('admin', 'moderator'),
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
