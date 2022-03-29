import { Mailable } from './Mailable'
import { Mail } from './Mail'

export class MailServiceResolver

	prop app

	def constructor app
		self.app = app

	def boot
		configure!

		self.app.onResponse do(response, request, reply)
			if !(response instanceof Mailable) then return
			
			reply.header 'content-type', 'text/html'

			reply.send String(response.render ? response.render! : '<p></p>')

			reply.sent = true
		
	def register
		null

	def configure
		Mail.configure(self.app.config.get 'mail')
