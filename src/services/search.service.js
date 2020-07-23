import models from '../models';

const { User } = models;

class SearchService {
	static searchUser(user, { offset, limit }) {
		return User.findAndCountAll({ where: user, offset, limit });
	}
}

export default SearchService;
