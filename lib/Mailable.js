const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');

/*body*/
module.exports = class Mailable {
	constructor($$ = null){
		this[Ψ__init__]($$);
	}
	[Ψ__init__]($$ = null){
		this.subject = $$ ? $$.subject : undefined;
		this.attachments = $$ ? $$.attachments : undefined;
		
	}
	/**
	@param {Object[]|Object} attachment
	*/
	attach(attachment = []){
		
		if (Array.isArray(attachment)) {
			
			this.attachments = attachment;
			
			return this;
		};
		
		if (!this.attachments) {
			
			this.attachments = [];
		};
		
		this.attachments.push(attachment);
		
		return this;
	}
};
