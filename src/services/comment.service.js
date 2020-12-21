import models from '../models';

const { Comment, User } = models;

/**
 * Comment Service Class
 */
class CommentService {
	/**
	 * @param  {object} comment
	 * @returns {object} function to create a comment
	 */
	static createComment(comment) {
		return Comment.create(comment);
	}

	/**
	 * @param  {object} postId
	 * @param  {integer} {offset
	 * @param  {integer} limit}
	 * @returns {object} function to get and count all comments
	 */
	static findAndCountComments(postId, { offset, limit }) {
		return Comment.findAndCountAll({
			where: postId,
			order: [['id', 'DESC']],
			include: {
				model: User,
				attributes: [
					'id',
					'firstName',
					'lastName',
					'profilePicture',
					'role',
					'status',
				],
			},
			offset,
			limit,
		});
	}

	/**
	 * @param  {intger} commentId
	 * @returns {object} function to get a comment
	 */
	static findComment(commentId) {
		return Comment.findOne({ where: commentId });
	}

	/**
	 * @returns {object} function to find all comments
	 */
	static getComments() {
		return Comment.findAll();
	}

	/**
	 * @param  {object} commentId
	 * @param  {object} property
	 * @returns {object} function to update a comment
	 */
	static updateComment(commentId, property) {
		return Comment.update(property, { where: commentId, returning: true });
	}

	/**
	 * @param  {intger} commentId
	 * @returns {object} function to delete a comment
	 */
	static destroyComment(commentId) {
		return Comment.destroy({ where: commentId });
	}
}

export default CommentService;
