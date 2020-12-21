const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	/**
	 * Unlike model class
	 */
	class Unlike extends Model {
		/**
		 * @param {object} models
		 * @returns {object} function to define association
		 */
		static associate(models) {
			// define association here
			Unlike.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
			Unlike.belongsTo(models.Post, { foreignKey: 'postId', targetKey: 'id' });
		}
	}
	Unlike.init(
		{
			unlikeId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			postId: DataTypes.INTEGER,
			isUnliked: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Unlike',
		}
	);
	return Unlike;
};
