import bcrypt from 'bcrypt';

/**
 * Bcrypt Service class
 */
class BcryptService {
	/**
	 * @param  {string} password
	 * @returns {object} function to hash a password.
	 */
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	/**
	 * @param  {string} plainPassword
	 * @param  {string} hashPassword
	 * @returns {object} function to compare passwords.
	 */
	static comparePassword(plainPassword, hashPassword) {
		return bcrypt.compareSync(plainPassword, hashPassword);
	}
}

export default BcryptService;
