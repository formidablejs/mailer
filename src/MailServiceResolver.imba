import { Mailable } from './Mailable'
import { ServiceResolver } from '@formidablejs/framework'
import { Mail } from './Mail'
import type { FastifyRequest } from '@formidablejs/framework'
import type { FastifyReply } from '@formidablejs/framework'

export class MailServiceResolver < ServiceResolver

	def boot
		configure!

		self.app.onResponse do(response, request\FastifyRequest, reply\FastifyReply)
			if !(response instanceof Mailable) then return
			
			reply.header 'content-type', 'text/html'

			reply.send String(response.render ? response.render! : '<p></p>')

			reply.sent = true
		
	def configure
		Mail.configure(self.app.config.get 'mail')
