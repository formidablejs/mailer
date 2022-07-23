const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Mailable'/*$path$*/);
var $2 = require('./Mail'/*$path$*/);

class MailServiceResolver {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.app) !== undefined && (this.app = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.app = $$ ? $$.app : undefined;
		
	}
	constructor(app){
		this[$__init__$]();
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
