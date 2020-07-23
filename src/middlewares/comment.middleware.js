import PostService from '../services/post.service';
import ResponseService from '../services/response.service';
import CommentService from '../services/comment.service';

export async function checkPostExists(req, res, next) {
	const post = await PostService.findPost({ id: parseInt(req.params.postId) });

	if (!post) {
		ResponseService.setError(404, 'No post found');
		return ResponseService.send(res);
	}
	next();
}

export async function checkComment(req, res, next) {
	const comment = await CommentService.findComment({
		id: parseInt(req.params.commentId),
	});

	if (!comment) {
		ResponseService.setError(404, 'No comment found');
		return ResponseService.send(res);
	}

	if (comment.postId !== parseInt(req.params.postId)) {
		ResponseService.setError(401, 'Comment not belong to this post');
		return ResponseService.send(res);
	}

	if (comment.userId !== req.userData.id) {
		ResponseService.setError(401, "You are not allowed to delete other's post");
		return ResponseService.send(res);
	}
	next();
}
