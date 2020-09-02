import models from '../models';

const { Post, User } = models;

class PostService {
	static createPost(post) {
		return Post.create(post);
	}

	static getPosts({ offset, limit }) {
		return Post.findAndCountAll({
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

	static getOwnPosts(id, { offset, limit }) {
		return Post.findAndCountAll({
			where: id,
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
			order: [['id', 'DESC']],
			offset,
			limit,
		});
	}

	static getAllOwnPosts(id) {
		return Post.findAll({ where: id });
	}

	static findPost(postId) {
		return Post.findOne({
			where: postId,
			include: {
				model: User,
				attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
			},
		});
	}

	static updatePost(postId, property) {
		return Post.update(property, {
			where: postId,
			returning: true,
		});
	}

	static destroyPost(postId) {
		return Post.destroy({ where: postId });
	}
}

export default PostService;
