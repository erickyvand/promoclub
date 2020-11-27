/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to create unlikes table
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Unlikes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		unlikeId: {
			type: Sequelize.INTEGER,
		},
		userId: {
			type: Sequelize.INTEGER,
		},
		postId: {
			type: Sequelize.INTEGER,
		},
		isUnliked: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	});
}

/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to drop unlikes table
 */
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Unlikes');
}
