export = Mail;
declare class Mail {
    /**
    @param {String[]|String} emails
    */
    static to(emails: string[] | string): import("./Mail");
    /**
    @param {Object} config
    */
    static configure(config: any): any;
    /**
    @param {String[]|String} emails
    */
    constructor(emails: string[] | string);
    toList: string;
    ccList: any;
    bccList: any;
    emailReplyTo: any;
    emailFrom: any;
    emailSubject: any;
    transport(): any;
    /**
    @param {Object} mailer
    */
    smtpTransport(mailer: any): any;
    /**
    @param {Object} mailer
    */
    sendmailTransport(mailer: any): any;
    /**
    @param {String[]|String} emails
    */
    cc(emails: string[] | string): import("./Mail");
    /**
    @param {String[]|String} emails
    */
    bcc(emails: string[] | string): import("./Mail");
    /**
    @param {String} name
    @param {String} email
    */
    from(name: string, email: string): import("./Mail");
    /**
    @param {String} email
    */
    replyTo(email: string): import("./Mail");
    /**
    @param {String} content
    @param {String} text
    */
    raw(content: string, text?: string): Promise<any>;
    /**
    @param {Mailable} mailable
    */
    send(mailable: Mailable): Promise<any>;
    /**
    @param {String} subject
    */
    subject(subject: string): import("./Mail");
    [Ψ__init__]($$?: any): void;
}
import Mailable = require("./Mailable");
declare const Ψ__init__: unique symbol;
