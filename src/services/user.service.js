import models from '../models';

const { User } = models;

/**
 * User Service clas
*/
class UserService {
	/**
	 * @param {object} user
	 * @returns {object} this function create a user
	 */
	static createUser(user) {
		return User.create(user);
	}

	/**
	 * @param {object} property
	 * @returns {object} this function find one record based on its property
	 */
	static findByProperty(property) {
		return User.findOne({ where: property });
	}

	/**
	 * @param {object} clause
	 * @param {object} property
	 * @returns {object} this function update a user
	 */
	static updateProperty(clause, property) {
		return User.update(property, {
			where: clause,
			returning: true,
		});
	}

	/**
	 * @returns {object} this function get all users
	 */
	static findAllUsers() {
		return User.findAll();
	}
}

export default UserService;
