import type { MailHandle } from '../ts'
import { Mailable } from './Mailable'
import nodemailer from 'nodemailer'

const settings = {
	config: {}
}

export class Mail

	prop toList\string[]|string
	prop ccList\string[]|string
	prop bccList\string[]|string
	prop emailReplyTo\string
	prop emailFrom
	prop emailSubject\string
	prop emailAttachments\object[]

	def constructor emails\string[]|string
		self.toList = Array.isArray(emails) ? emails.join(', ') : emails

	def transport
		const default = settings.config.default

		if default == 'none' then return null

		let mailer = settings.config.mailers[default]

		nodemailer.createTransport(
			self["{mailer.transport.toLowerCase!}Transport"](mailer)
		)

	def smtpTransport mailer\object
		const transport = { ...mailer }

		transport.auth = {
			user: transport.username
			pass: transport.password
		}

		delete transport.username
		delete transport.password
		delete transport.transport

		transport

	def sendmailTransport mailer\object
		const transport = { ...mailer }

		transport.sendmail = true

		delete transport.transport

		transport

	static def to emails\string[]|string
		new Mail(emails)

	def cc emails\string[]|string
		self.ccList = Array.isArray(emails) ? emails.join(', ') : emails

		self

	def bcc emails\string[]|string
		self.bccList = Array.isArray(emails) ? emails.join(', ') : emails

		self

	def from name\string, email\string
		self.emailFrom = "{name} <{email}>"

		self

	def replyTo email\string
		self.emailReplyTo = email

		self

	def raw content\string, argument\string|MailHandle = null, config\MailHandle = {}
		if settings.config.default == 'none' then return null

		const mail = {
			from: self.emailFrom ?? "{settings.config.from.name} <{settings.config.from.address}>"
			to: self.toList
			subject: self.emailSubject
			html: content
		}

		if argument && typeof argument === 'string' then mail.text = argument
		if self.ccList then mail.cc = self.ccList
		if self.bccList then mail.bcc = self.bccList
		if self.emailReplyTo then mail.replyTo = self.emailReplyTo
		if self.emailAttachments then mail.attachments = self.emailAttachments

		config = argument && typeof argument !== 'string' ? argument : config

		if config.onSuccess || config.onError || config.onComplete
			self.transport!.sendMail(mail).then(do(response)
				config.onSuccess(response) if config.onSuccess
			).catch(do(reason)
				config.onError(reason) if config.onError
			).finally(do
				config.onComplete(response) if config.onComplete
			)
		else
			await self.transport!.sendMail(mail)

	def attach attachment\object[]|object = []
		if Array.isArray(attachment)
			self.emailAttachments = attachment

			return self

		if !self.emailAttachments
			self.emailAttachments = []

		self.emailAttachments.push attachment

		self

	def send mailable\Mailable, config\MailHandle = {}
		if settings.config.default == 'none' then return null

		if mailable.subject then self.emailSubject = mailable.subject

		if mailable.attachments then self.emailAttachments = mailable.attachments

		self.raw(mailable.render ? String(await mailable.render!) : '', null, config)

	def subject subject\string
		self.emailSubject = subject

		self

	static def configure config\object
		settings.config = config
