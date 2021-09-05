const Mail = require './Mail'

module.exports = class MailServiceResolver

	prop app

	def constructor app
		self.app = app

	def boot
		Mail.configure(self.app.config.get 'mail')

	def register
		self
