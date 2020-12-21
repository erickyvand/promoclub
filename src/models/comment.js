const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * Comment model class
	 */
	class Comment extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
			Comment.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
		}
	}
	Comment.init(
		{
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			comment: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: 'Comment',
		}
	);
	return Comment;
};
