import express from 'express';
import PostController from '../controllers/post.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';
import {
	validateUserPost,
	validatePostUrlParam,
	validateUserEditPost,
} from '../validations/post.validation';
import { checkPostOwner, checkLiked, checkUnliked } from '../middlewares/post.middleware';
import CommentController from '../controllers/comment.controller';
import {
	checkPostExists,
	checkComment,
} from '../middlewares/comment.middleware';
import {
	validatePostComment,
	validateUrlIds,
} from '../validations/comment.validation';

const router = express.Router();

router.post('/', allowAssessRoute, validateUserPost, PostController.postStatus);
router.get('/', allowAssessRoute, PostController.viewPosts);
router.get('/view', allowAssessRoute, PostController.viewOwnPosts);
router.patch(
	'/:postId/edit',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostOwner,
	validateUserEditPost,
	PostController.editPost
);
router.delete(
	'/:postId/delete',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostOwner,
	PostController.deletePost
);
router.post(
	'/:postId/comments',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	validatePostComment,
	CommentController.postComment
);
router.get(
	'/:postId/comments',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	CommentController.viewComments
);
router.patch(
	'/:postId/comments/:commentId/edit',
	allowAssessRoute,
	validateUrlIds,
	checkPostExists,
	checkComment,
	validatePostComment,
	CommentController.editComment
);
router.delete(
	'/:postId/comments/:commentId/delete',
	allowAssessRoute,
	validateUrlIds,
	checkPostExists,
	checkComment,
	CommentController.deleteComment
);
router.patch(
	'/:postId/like',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	checkLiked,
	PostController.likePost
);
router.get(
	'/:postId/count-likes',
	allowAssessRoute,
	validatePostUrlParam,
	PostController.getCountedLikes
);
router.patch(
	'/:postId/unlike',
	allowAssessRoute,
	validatePostUrlParam,
	checkPostExists,
	checkUnliked,
	PostController.unlikePost
);
router.get(
	'/:postId/count-unlikes',
	allowAssessRoute,
	validatePostUrlParam,
	PostController.getCountedUnlikes
);

export default router;
