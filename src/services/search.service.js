import models from '../models';

const { User } = models;

/**
 * Search service class
 */
class SearchService {
	/**
	 * @param  {object} user
	 * @param  {object} {offset
	 * @param  {object} limit}
	 * @returns {object} function to search a user
	 */
	static searchUser(user, { offset, limit }) {
		return User.findAndCountAll({ where: user, offset, limit });
	}
}

export default SearchService;
