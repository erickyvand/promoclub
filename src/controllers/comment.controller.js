import ResponseService from '../services/response.service';
import CommentService from '../services/comment.service';
import { paginationHelper } from '../helpers';
import PostService from '../services/post.service';
import NotificationService from '../services/notification.service';

/**
 * Comments controller class
*/
class CommentController {
	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to post a comment
	 */
	static async postComment(req, res) {
		const postId = parseInt(req.params.postId);
		const userId = req.userData.id;
		const recipient = await PostService.findPost({ id: postId });

		const comment = await CommentService.createComment({
			userId,
			postId,
			comment: req.body.comment,
		});

		if (recipient.userId !== userId) {
			await NotificationService.createNotification({
				senderId: userId,
				recipientId: recipient.userId,
				postId,
				type: 'comment',
			});
		}
		ResponseService.setSuccess(201, 'Comment was posted', comment);
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to view a comment
	 */
	static async viewComments(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await CommentService.findAndCountComments(
			{ postId: parseInt(req.params.postId) },
			{ offset, limit },
		);
		ResponseService.setSuccess(200, 'All Comments per post', {
			pageMeta: paginationHelper({
				count: results.count,
				rows: results.rows,
				offset,
				limit,
			}),
			rows: results.rows,
		});
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to view comments
	 */
	static async viewAllComments(req, res) {
		const comments = await CommentService.getComments();
		ResponseService.setSuccess(200, 'All comments posted', comments);
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to edit a comment
	 */
	static async editComment(req, res) {
		const updatedComment = await CommentService.updateComment(
			{ id: parseInt(req.params.commentId) },
			{ comment: req.body.comment },
		);
		ResponseService.setSuccess(
			200,
			'Comment updated',
			updatedComment[1][0].dataValues,
		);
		return ResponseService.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to delete a comment
	 */
	static async deleteComment(req, res) {
		await CommentService.destroyComment({ id: parseInt(req.params.commentId) });
		ResponseService.setSuccess(200, 'Comment was deleted', Math.random());
		return ResponseService.send(res);
	}
}

export default CommentController;
