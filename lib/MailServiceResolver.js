Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/framework'/*$path$*/);
var $2 = require('./Mail'/*$path$*/);

class MailServiceResolver extends $1.ServiceResolver {
	
	
	boot(){
		
		return $2.Mail.configure(this.app.config.get('mail'));
	}
};
exports.MailServiceResolver = MailServiceResolver;
