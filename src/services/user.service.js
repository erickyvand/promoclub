import models from '../models';

const { User } = models;

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

	static updateProperty(clause, property) {
		return User.update(property, {
			where: clause,
			returning: true,
		});
	}

	static findAllUsers(property) {
		return User.findAll({ where: property });
	}
}

export default UserService;
