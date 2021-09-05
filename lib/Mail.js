const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');

const Mailable = require('./Mailable'/*$path$*/);
const nodemailer = require('nodemailer'/*$path$*/);

const settings = {
	config: {}
};

module.exports = class Mail {
	[Ψ__init__]($$ = null){
		this.toList = $$ ? $$.toList : undefined;
		this.ccList = $$ ? $$.ccList : undefined;
		this.bccList = $$ ? $$.bccList : undefined;
		this.emailReplyTo = $$ ? $$.emailReplyTo : undefined;
		this.emailFrom = $$ ? $$.emailFrom : undefined;
		this.emailSubject = $$ ? $$.emailSubject : undefined;
		
	}
	/**
	@param {String[]|String} emails
	*/
	constructor(emails){
		this[Ψ__init__]();
		this.toList = Array.isArray(emails) ? emails.join(', ') : emails;
	}
	
	transport(){
		
		const default$ = settings.config.default;
		
		let mailer = settings.config.mailers[default$];
		
		return nodemailer.createTransport(
			this[("" + mailer.transport.toLowerCase() + "Transport")](mailer)
		);
	}
	
	/**
	@param {Object} mailer
	*/
	smtpTransport(mailer){
		var φ, φ2, φ3;
		
		const transport = {...mailer};
		
		transport.auth = {
			user: transport.username,
			pass: transport.password
		};
		
		(((φ = transport.username),delete transport.username, φ));
		(((φ2 = transport.password),delete transport.password, φ2));
		(((φ3 = transport.transport),delete transport.transport, φ3));
		
		return transport;
	}
	
	/**
	@param {Object} mailer
	*/
	sendmailTransport(mailer){
		var φ4;
		
		const transport = {...mailer};
		
		transport.sendmail = true;
		
		(((φ4 = transport.transport),delete transport.transport, φ4));
		
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
		var φ5;
		
		const mail = {
			from: ((φ5 = this.emailFrom) != null) ? (φ5) : (("" + (settings.config.from.name) + " <" + (settings.config.from.address) + ">")),
			to: this.toList,
			subject: this.emailSubject,
			html: content
		};
		
		if (text) { mail.text = text };
		if (this.ccList) { mail.cc = this.ccList };
		if (this.bccList) { mail.bcc = this.bccList };
		if (this.emailReplyTo) { mail.replyTo = this.emailReplyTo };
		
		return await this.transport().sendMail(mail);
	}
	
	/**
	@param {Mailable} mailable
	*/
	async send(mailable){
		
		if (mailable.subject) { this.emailSubject = mailable.subject };
		
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
