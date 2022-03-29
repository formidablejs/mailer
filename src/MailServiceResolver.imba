import { ServiceResolver } from '@formidablejs/framework'
import { Mail } from './Mail'

export class MailServiceResolver < ServiceResolver

	def boot
		Mail.configure(self.app.config.get 'mail')
