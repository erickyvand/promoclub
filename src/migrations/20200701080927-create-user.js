/**
 * @param  {object} queryInterface
 * @param  {object} Sequelize
 * @returns {object} function to create users table
 */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		dateOfBirth: {
			allowNull: true,
			type: Sequelize.DATE,
		},
		address: {
			allowNull: true,
			type: Sequelize.STRING,
		},
		profilePicture: {
			type: Sequelize.STRING,
			defaultValue: 'avatar.jpg',
		},
		role: {
			type: Sequelize.ENUM('admin', 'moderator'),
			defaultValue: 'moderator',
		},
		status: {
			type: Sequelize.STRING,
			defaultValue: 'active',
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
 * @returns {object} function to drop users table
 */
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Users');
}
