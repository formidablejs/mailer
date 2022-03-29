Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Mailable'/*$path$*/);
var $2 = require('@formidablejs/framework'/*$path$*/);
var $3 = require('./Mail'/*$path$*/);
class MailServiceResolver extends $2.ServiceResolver {
	
	
	boot(){
		
		this.configure();
		
		return this.app.onResponse(function(response,/**@type {FastifyRequest}*/request,/**@type {FastifyReply}*/reply) {
			
			if (!((response instanceof $1.Mailable))) { return };
			
			reply.header('content-type','text/html');
			
			reply.send(String(response.render ? response.render() : '<p></p>'));
			
			return reply.sent = true;
		});
	}
	configure(){
		
		return $3.Mail.configure(this.app.config.get('mail'));
	}
};
exports.MailServiceResolver = MailServiceResolver;
