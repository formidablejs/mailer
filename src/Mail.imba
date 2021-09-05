const Mailable = require './Mailable'
const nodemailer = require 'nodemailer'

const settings = {
	config: {}
}

module.exports = class Mail

	prop toList\String[]|String
	prop ccList\String[]|String
	prop bccList\String[]|String
	prop emailReplyTo\String
	prop emailFrom
	prop emailSubject\String

	def constructor emails\String[]|String
		self.toList = Array.isArray(emails) ? emails.join(', ') : emails

	def transport
		const default = settings.config.default

		let mailer = settings.config.mailers[default]

		nodemailer.createTransport(
			self["{mailer.transport.toLowerCase!}Transport"](mailer)
		)

	def smtpTransport mailer\Object
		const transport = { ...mailer }

		transport.auth = {
			user: transport.username
			pass: transport.password
		}

		delete transport.username
		delete transport.password
		delete transport.transport

		transport

	def sendmailTransport mailer\Object
		const transport = { ...mailer }

		transport.sendmail = true

		delete transport.transport

		transport

	static def to emails\String[]|String
		new Mail(emails)

	def cc emails\String[]|String
		self.ccList = Array.isArray(emails) ? emails.join(', ') : emails

		self
	
	def bcc emails\String[]|String
		self.bccList = Array.isArray(emails) ? emails.join(', ') : emails

		self

	def from name\String, email\String
		self.emailFrom = "{name} <{email}>"

		self

	def replyTo email\String
		self.emailReplyTo = email

		self

	def raw content\String, text\String = null
		const mail = {
			from: self.emailFrom ?? "{settings.config.from.name} <{settings.config.from.address}>"
			to: self.toList
			subject: self.emailSubject
			html: content
		}

		if text then mail.text = text
		if self.ccList then mail.cc = self.ccList
		if self.bccList then mail.bcc = self.bccList
		if self.emailReplyTo then mail.replyTo = self.emailReplyTo

		await self.transport!.sendMail(mail)

	def send mailable\Mailable
		if mailable.subject then self.emailSubject = mailable.subject

		self.raw(mailable.render ? String(await mailable.render!) : '')

	def subject subject\String
		self.emailSubject = subject

		self

	static def configure config\Object
		settings.config = config
