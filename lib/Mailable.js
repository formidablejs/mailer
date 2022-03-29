const $1 = Symbol.for('#__init__'), $2 = Symbol.for('#__patch__'), $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
class Mailable {
	[$2]($$ = {}){
		var $4;
		($4 = $$.subject) !== undefined && (this.subject = $4);
		($4 = $$.attachments) !== undefined && (this.attachments = $4);
		
	}
	constructor($$ = null){
		this[$1]($$);
	}
	[$1]($$ = null){
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
