import { Op } from 'sequelize';
import SearchService from '../services/search.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

class SearchController {
	static async searchContent(req, res) {
		const { term } = req.query;
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;
		const results = await SearchService.searchUser(
			{
				[Op.or]: {
					firstName: { [Op.iLike]: `%${term}%` },
					lastName: { [Op.iLike]: `%${term}%` },
				},
			},
			{ offset, limit }
		);
		const userResults = results.rows.map(result => {
			const user = {
				id: result.id,
				firstName: result.firstName,
				lastName: result.lastName,
				profilePicture: result.profilePicture,
			};
			return user;
		});
		ResponseService.setSuccess(200, 'Search results', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: userResults,
		});
		return ResponseService.send(res);
	}
}

export default SearchController;
