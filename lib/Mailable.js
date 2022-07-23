const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Mailable {
	[$__patch__$]($$ = {}){
		var $1;
		($1 = $$.subject) !== undefined && (this.subject = $1);
		($1 = $$.attachments) !== undefined && (this.attachments = $1);
		
	}
	constructor($$ = null){
		this[$__init__$]($$);
	}
	[$__init__$]($$ = null,deep = true){
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
exports.Mailable = Mailable;
