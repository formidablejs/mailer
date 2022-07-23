function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./Mailable'/*$path$*/);
var $2 = requireDefault$__(require('nodemailer'/*$path$*/));

const settings = {
	config: {}
};

class Mail {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.toList) !== undefined && (this.toList = $3);
		($3 = $$.ccList) !== undefined && (this.ccList = $3);
		($3 = $$.bccList) !== undefined && (this.bccList = $3);
		($3 = $$.emailReplyTo) !== undefined && (this.emailReplyTo = $3);
		($3 = $$.emailFrom) !== undefined && (this.emailFrom = $3);
		($3 = $$.emailSubject) !== undefined && (this.emailSubject = $3);
		($3 = $$.emailAttachments) !== undefined && (this.emailAttachments = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		this.toList = $$ ? $$.toList : undefined;
		this.ccList = $$ ? $$.ccList : undefined;
		this.bccList = $$ ? $$.bccList : undefined;
		this.emailReplyTo = $$ ? $$.emailReplyTo : undefined;
		this.emailFrom = $$ ? $$.emailFrom : undefined;
		this.emailSubject = $$ ? $$.emailSubject : undefined;
		this.emailAttachments = $$ ? $$.emailAttachments : undefined;
		
	}
	/**
	@param {String[]|String} emails
	*/
	constructor(emails){
		this[$__init__$]();
		this.toList = Array.isArray(emails) ? emails.join(', ') : emails;
	}
	
	transport(){
		
		const default$ = settings.config.default;
		
		if (default$ == 'none') { return null };
		
		let mailer = settings.config.mailers[default$];
		
		return $2.default.createTransport(
			this[("" + mailer.transport.toLowerCase() + "Transport")](mailer)
		);
	}
	
	/**
	@param {Object} mailer
	*/
	smtpTransport(mailer){
		var $4, $5, $6;
		
		const transport = {...mailer};
		
		transport.auth = {
			user: transport.username,
			pass: transport.password
		};
		
		((($4 = transport.username),delete transport.username, $4));
		((($5 = transport.password),delete transport.password, $5));
		((($6 = transport.transport),delete transport.transport, $6));
		
		return transport;
	}
	
	/**
	@param {Object} mailer
	*/
	sendmailTransport(mailer){
		var $7;
		
		const transport = {...mailer};
		
		transport.sendmail = true;
		
		((($7 = transport.transport),delete transport.transport, $7));
		
		return transport;
	}
	
	/**
	@param {String[]|String} emails
	*/
	static to(emails){
		
		return new Mail(emails);
	}
	
	/**
	@param {String[]|String} emails
	*/
	cc(emails){
		
		this.ccList = Array.isArray(emails) ? emails.join(', ') : emails;
		
		return this;
	}
	
	/**
	@param {String[]|String} emails
	*/
	bcc(emails){
		
		this.bccList = Array.isArray(emails) ? emails.join(', ') : emails;
		
		return this;
	}
	
	/**
	@param {String} name
	@param {String} email
	*/
	from(name,email){
		
		this.emailFrom = ("" + name + " <" + email + ">");
		
		return this;
	}
	
	/**
	@param {String} email
	*/
	replyTo(email){
		
		this.emailReplyTo = email;
		
		return this;
	}
	
	/**
	@param {String} content
	@param {String} text
	*/
	async raw(content,text = null){
		var $8;
		
		if (settings.config.default == 'none') { return null };
		
		const mail = {
			from: (($8 = this.emailFrom) != null) ? ($8) : (("" + (settings.config.from.name) + " <" + (settings.config.from.address) + ">")),
			to: this.toList,
			subject: this.emailSubject,
			html: content
		};
		
		if (text) { mail.text = text };
		if (this.ccList) { mail.cc = this.ccList };
		if (this.bccList) { mail.bcc = this.bccList };
		if (this.emailReplyTo) { mail.replyTo = this.emailReplyTo };
		if (this.emailAttachments) { mail.attachments = this.emailAttachments };
		
		return await this.transport().sendMail(mail);
	}
	
	/**
	@param {Object[]|Object} attachment
	*/
	attach(attachment = []){
		
		if (Array.isArray(attachment)) {
			
			this.emailAttachments = attachment;
			
			return this;
		};
		
		if (!this.emailAttachments) {
			
			this.emailAttachments = [];
		};
		
		this.emailAttachments.push(attachment);
		
		return this;
	}
	
	/**
	@param {Mailable} mailable
	*/
	async send(mailable){
		
		if (settings.config.default == 'none') { return null };
		
		if (mailable.subject) { this.emailSubject = mailable.subject };
		
		if (mailable.attachments) { this.emailAttachments = mailable.attachments };
		
		return this.raw(mailable.render ? String(await mailable.render()) : '');
	}
	
	/**
	@param {String} subject
	*/
	subject(subject){
		
		this.emailSubject = subject;
		
		return this;
	}
	
	/**
	@param {Object} config
	*/
	static configure(config){
		
		return settings.config = config;
	}
};
exports.Mail = Mail;
