module.exports = class Mailable

	prop subject\String
	prop attachments\Object[]

	def attach attachment\Object[]|Object = []
		if Array.isArray(attachment)
			self.attachments = attachment

			return self

		if !self.attachments
			self.attachments = []

		self.attachments.push attachment

		self
