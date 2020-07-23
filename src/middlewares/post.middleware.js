import ResponseService from '../services/response.service';
import PostService from '../services/post.service';
import LikeService from '../services/like.service';
import NotificationService from '../services/notification.service';
import UnlikeService from '../services/unlike.service';

export const checkUserAccount = (req, res, next) => {
	if (!req.userData.id) {
		ResponseService.setError(401, 'Unauthorized, not your account');
		return ResponseService.send(res);
	}
	next();
};

export async function checkPostOwner(req, res, next) {
	const post = await PostService.findPost({ id: req.params.postId });

	if (!post) {
		ResponseService.setError(404, 'No post found');
		return ResponseService.send(res);
	}

	if (req.userData.id !== post.userId) {
		ResponseService.setError(401, 'Unauthorized, not your post');
		return ResponseService.send(res);
	}
	next();
}

export async function checkLiked(req, res, next) {
	const userId = req.userData.id;
	const likeId = parseInt(`${userId}${req.params.postId}`);
	const userLike = await LikeService.findLike({ likeId });

	if (userLike) {
		await LikeService.removeLike({ likeId });
		await NotificationService.removeNotification({
			senderId: userId,
			postId: parseInt(req.params.postId),
		});
		ResponseService.setSuccess(200, 'Like removed');
		return ResponseService.send(res);
	}
	next();
}

export async function checkUnliked(req, res, next) {
	const userId = req.userData.id;
	const unlikeId = parseInt(`${userId}${req.params.postId}`);
	const userUnlike = await UnlikeService.findUnlike({ unlikeId });

	if (userUnlike) {
		await UnlikeService.removeUnlike({ unlikeId });
		ResponseService.setSuccess(200, 'Unlike removed');
		return ResponseService.send(res);
	}
	next();
}
