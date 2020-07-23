import ResponseService from '../services/response.service';
import PostService from '../services/post.service';
import { paginationHelper } from '../helpers';
import LikeService from '../services/like.service';
import NotificationService from '../services/notification.service';
import UnlikeService from '../services/unlike.service';

class PostController {
	static async postStatus(req, res) {
		const { mediaFile } = req.files;
		mediaFile.mv(`./src/uploads/${mediaFile.name}`);

		const post = await PostService.createPost({
			userId: req.userData.id,
			post: req.body.post,
			mediaFile: mediaFile.name,
		});
		ResponseService.setSuccess(201, 'Your post was created', post);
		return ResponseService.send(res);
	}

	static async viewPosts(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await PostService.getPosts({ offset, limit });

		ResponseService.setSuccess(200, 'All posts', {
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

	static async viewOwnPosts(req, res) {
		const { page = 1, limit = 10 } = req.query;
		const offset = (page - 1) * limit;

		const results = await PostService.getOwnPosts(
			{ userId: req.userData.id },
			{ offset, limit }
		);
		ResponseService.setSuccess(200, 'Your posts', {
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

	static async editPost(req, res) {
		const { mediaFile } = req.files;
		mediaFile.mv(`./src/uploads/${mediaFile.name}`);

		const updatedPost = await PostService.updatePost(
			{ id: parseInt(req.params.postId) },
			{ post: req.body.post, mediaFile: mediaFile.name }
		);
		ResponseService.setSuccess(200, 'Post Updated', updatedPost);
		return ResponseService.send(res);
	}

	static async deletePost(req, res) {
		await PostService.destroyPost({ id: parseInt(req.params.postId) });
		ResponseService.setSuccess(200, 'Post deleted');
		return ResponseService.send(res);
	}

	static async likePost(req, res) {
		const userId = req.userData.id;
		const postId = parseInt(req.params.postId);
		const recipient = await PostService.findPost({ id: postId });

		const unlikeId = parseInt(`${userId}${postId}`);
		const unliked = await UnlikeService.findUnlike({ unlikeId });

		if (unliked) {
			await UnlikeService.removeUnlike({ unlikeId });
		}

		const liked = await LikeService.makeLike({
			likeId: parseInt(`${userId}${postId}`),
			userId,
			postId,
			isLiked: true,
		});

		await NotificationService.createNotification({
			senderId: userId,
			recipientId: recipient.userId,
			postId,
			type: 'like',
		});
		ResponseService.setSuccess(201, 'You like this post', liked);
		return ResponseService.send(res);
	}

	static async getCountedLikes(req, res) {
		const likes = await LikeService.countLike({
			postId: parseInt(req.params.postId),
		});
		ResponseService.setSuccess(200, 'Total number of likes', likes);
		return ResponseService.send(res);
	}

	static async unlikePost(req, res) {
		const userId = req.userData.id;
		const postId = parseInt(req.params.postId);
		const likeId = parseInt(`${userId}${postId}`);
		const liked = await LikeService.findLike({ likeId });

		if (liked) {
			await LikeService.removeLike({ likeId });
		}

		const unliked = await UnlikeService.makeUnlike({
			unlikeId: parseInt(`${userId}${postId}`),
			userId,
			postId,
			isUnliked: true,
		});
		ResponseService.setSuccess(201, 'You dislike this post', unliked);
		return ResponseService.send(res);
	}

	static async getCountedUnlikes(req, res) {
		const unlikes = await UnlikeService.countUnlike({
			postId: parseInt(req.params.postId),
		});
		ResponseService.setSuccess(200, 'Total number of dislikes', unlikes);
		return ResponseService.send(res);
	}
}

export default PostController;
