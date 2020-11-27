import jwt from 'jsonwebtoken';

/**
 * Token service class
 */
class TokenService {
	/**
	 * @param {string} data
	 * @returns {string} function to generate a token string
	 */
	static generateToken(data) {
		return jwt.sign(data, process.env.SECRET, {
			expiresIn: process.env.EXPIRE_TIME,
		});
	}

	/**
	 * @param  {string} token
	 * @returns {object} function to verify a token
	 */
	static verifyToken(token) {
		return jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return err;
			}
			return decoded;
		});
	}
}

export default TokenService;
