const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * Like model class
	*/
	class Like extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			Like.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
			Like.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
		}
	}
	Like.init(
		{
			likeId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			isLiked: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Like',
		}
	);
	return Like;
};
