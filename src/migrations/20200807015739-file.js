/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to add column on posts table
 */
export async function up(queryInterface, Sequelize) {
	/**
	 * Add altering commands here.
	 *
	 * Example:
	 *
	 * */
	await queryInterface.addColumn('Posts', 'fileType', {
		type: Sequelize.STRING,
	});
}

/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to drop posts table
 */
export async function down(queryInterface, Sequelize) {
	/**
	 * Add reverting commands here.
	 *
	 * Example:
	 * await queryInterface.dropTable('users');
	 */
}
