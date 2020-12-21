/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to create comments table
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Comments', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		userId: {
			type: Sequelize.INTEGER,
		},
		postId: {
			type: Sequelize.INTEGER,
		},
		comment: {
			type: Sequelize.TEXT,
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
 * @returns {object} function to drop comments table
 */
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Comments');
}
