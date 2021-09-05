const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');

const Mail = require('./Mail'/*$path$*/);

module.exports = class MailServiceResolver {
	[Ψ__init__]($$ = null){
		this.app = $$ ? $$.app : undefined;
		
	}
	constructor(app){
		this[Ψ__init__]();
		this.app = app;
	}
	
	boot(){
		
		return Mail.configure(this.app.config.get('mail'));
	}
	
	register(){
		
		return this;
	}
};
