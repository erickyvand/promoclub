import models from '../models';

const { Like } = models;

/**
 * Like Service class
 */
class LikeService {
	/**
	 * @param  {object} property
	 * @returns {object} function to create a like
	 */
	static makeLike(property) {
		return Like.create(property);
	}

	/**
	 * @param  {object} likeId
	 * @returns {object} function to get a like
	 */
	static findLike(likeId) {
		return Like.findOne({ where: likeId });
	}

	/**
	 * @param  {object} userId
	 * @returns {object} function to remove a like
	 */
	static removeLike(userId) {
		return Like.destroy({ where: userId });
	}

	/**
	 * @returns {object} function to count likes
	 */
	static countLike() {
		return Like.findAll();
	}
}

export default LikeService;
