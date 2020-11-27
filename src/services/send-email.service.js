import sgMail from '@sendgrid/mail';

/**
 * Mail service class
 */
class SendEmailService {
	/**
	 * @param  {string} email
	 * @param  {string} subject
	 * @param  {text} body
	 * @returns {text} function to send an email
	 */
	static sendEmailToUser(email, subject, body) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: email,
			from: process.env.ADMIN_EMAIL,
			subject,
			html: body,
		};
		sgMail.send(msg);
	}
}

export default SendEmailService;
