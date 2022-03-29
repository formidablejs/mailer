export class Mail {
    /**
    @param {String[]|String} emails
    */
    static to(emails: string[] | string): Mail;
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
    emailAttachments: any;
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
    cc(emails: string[] | string): Mail;
    /**
    @param {String[]|String} emails
    */
    bcc(emails: string[] | string): Mail;
    /**
    @param {String} name
    @param {String} email
    */
    from(name: string, email: string): Mail;
    /**
    @param {String} email
    */
    replyTo(email: string): Mail;
    /**
    @param {String} content
    @param {String} text
    */
    raw(content: string, text?: string): Promise<any>;
    /**
    @param {Object[]|Object} attachment
    */
    attach(attachment?: any[] | any): Mail;
    /**
    @param {Mailable} mailable
    */
    send(mailable: Mailable): Promise<any>;
    /**
    @param {String} subject
    */
    subject(subject: string): Mail;
    [$2]($$?: {}): void;
    [$1]($$?: any): void;
}
import { Mailable } from "./Mailable";
declare const $2: unique symbol;
declare const $1: unique symbol;
export {};
