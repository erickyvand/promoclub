import models from '../models';

const { Unlike } = models;

/**
 * Unlike service class
 */
class UnlikeService {
	/**
	 * @param  {object} property
	 * @returns {object} function to make unlike
	 */
	static makeUnlike(property) {
		return Unlike.create(property);
	}

	/**
	 * @param  {object} likeId
	 * @returns {object} function to get unlike
	 */
	static findUnlike(likeId) {
		return Unlike.findOne({ where: likeId });
	}

	/**
	 * @param  {object} userId
	 * @returns {object} function to remove unlike
	 */
	static removeUnlike(userId) {
		return Unlike.destroy({ where: userId });
	}

	/**
	 * @returns {object} function to count unlike
	 */
	static countUnlike() {
		return Unlike.findAll();
	}
}

export default UnlikeService;
