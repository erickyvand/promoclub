/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to create posts table
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Posts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		userId: {
			type: Sequelize.INTEGER,
		},
		post: {
			type: Sequelize.TEXT,
		},
		mediaFile: {
			type: Sequelize.STRING,
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
 * @returns {object} function to drop posts table
 */
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Posts');
}
