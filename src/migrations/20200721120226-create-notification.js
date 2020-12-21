/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to create notifications table
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Notifications', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		senderId: {
			type: Sequelize.INTEGER,
		},
		recipientId: {
			type: Sequelize.INTEGER,
		},
		postId: {
			type: Sequelize.INTEGER,
		},
		read: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		type: {
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
 * @returns {object} function to drop notifications table
 */
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Notifications');
}
