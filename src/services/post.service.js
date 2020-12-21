import models from '../models';

const { Post, User } = models;

/**
 * Post service class
 */
class PostService {
	/**
	 * @param  {object} post
	 * @returns {object} function to create a post
	 */
	static createPost(post) {
		return Post.create(post);
	}

	/**
	 * @param  {object} {offset
	 * @param  {object} limit}
	 * @returns {object} function to get all posts
	 */
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

	/**
	 * @param  {object} id
	 * @param  {object} {offset
	 * @param  {object} limit}
	 * @returns {object} function to get own posts
	 */
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

	/**
	 * @param  {object} id
	 * @returns {object} function to get own posts
	 */
	static getAllOwnPosts(id) {
		return Post.findAll({ where: id });
	}

	/**
	 * @param  {object} postId
	 * @returns {object} function to get post
	 */
	static findPost(postId) {
		return Post.findOne({
			where: postId,
			include: {
				model: User,
				attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
			},
		});
	}

	/**
	 * @param  {object} postId
	 * @param  {object} property
	 * @returns {object} function to update a post
	 */
	static updatePost(postId, property) {
		return Post.update(property, {
			where: postId,
			returning: true,
		});
	}

	/**
	 * @param  {object} postId
	 * @returns {object} function to delete a post
	 */
	static destroyPost(postId) {
		return Post.destroy({ where: postId });
	}
}

export default PostService;
