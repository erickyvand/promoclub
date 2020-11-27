const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * Post model class
	 */
	class Post extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
			Post.hasMany(models.Comment, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Post.hasMany(models.Notification, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Post.hasMany(models.Like, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Post.hasMany(models.Unlike, {
				foreignKey: 'postId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Post.init(
		{
			userId: DataTypes.INTEGER,
			post: DataTypes.TEXT,
			mediaFile: DataTypes.STRING,
			fileType: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Post',
		}
	);
	return Post;
};
