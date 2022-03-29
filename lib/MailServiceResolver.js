const $3 = Symbol.for('#__init__'), $4 = Symbol.for('#__patch__'), $7 = Symbol.for('#__initor__'), $8 = Symbol.for('#__inited__'), $5 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Mailable'/*$path$*/);
var $2 = require('./Mail'/*$path$*/);

class MailServiceResolver {
	[$4]($$ = {}){
		var $6;
		($6 = $$.app) !== undefined && (this.app = $6);
		
	}
	[$3]($$ = null){
		this.app = $$ ? $$.app : undefined;
		
	}
	constructor(app){
		this[$3]();
		this.app = app;
	}
	
	boot(){
		
		this.configure();
		
		return this.app.onResponse(function(response,request,reply) {
			
			if (!((response instanceof $1.Mailable))) { return };
			
			reply.header('content-type','text/html');
			
			reply.send(String(response.render ? response.render() : '<p></p>'));
			
			return reply.sent = true;
		});
	}
	register(){
		
		return null;
	}
	
	configure(){
		
		return $2.Mail.configure(this.app.config.get('mail'));
	}
};
exports.MailServiceResolver = MailServiceResolver;
