/**
 * Response service class
 */
class ResponseService {
	/**
	 * @param  {integer} statusCode
	 * @param  {string} message
	 * @param  {object} data
	 * @returns {object} function to set a success response
	 */
	static setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	/**
	 * @param  {integer} statusCode
	 * @param  {string} message
	 * @returns {object} function to set response error
	 */
	static setError(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
	}

	/**
	 * @param  {object} res
	 * @returns {object} function to send a response
	 */
	static send(res) {
		if (this.type === 'success') {
			return res.status(this.statusCode).json({
				status: this.statusCode,
				message: this.message,
				data: this.data,
			});
		}
		return res.status(this.statusCode).json({
			status: this.statusCode,
			message: this.message,
		});
	}
}

export default ResponseService;
