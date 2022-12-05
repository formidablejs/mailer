export class Mail {
    /**
    @param {string[]|string} emails
    */
    static to(emails: string[] | string): Mail;
    /**
    @param {object} config
    */
    static configure(config: object): any;
    /**
    @param {string[]|string} emails
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
    @param {object} mailer
    */
    smtpTransport(mailer: object): any;
    /**
    @param {object} mailer
    */
    sendmailTransport(mailer: object): any;
    /**
    @param {string[]|string} emails
    */
    cc(emails: string[] | string): Mail;
    /**
    @param {string[]|string} emails
    */
    bcc(emails: string[] | string): Mail;
    /**
    @param {string} name
    @param {string} email
    */
    from(name: string, email: string): Mail;
    /**
    @param {string} email
    */
    replyTo(email: string): Mail;
    /**
    @param {string} content
    @param {string|MailHandle} argument
    @param {MailHandle} config
    */
    raw(content: string, argument?: string | MailHandle, config?: MailHandle): Promise<any>;
    /**
    @param {object[]|object} attachment
    */
    attach(attachment?: object[] | object): Mail;
    /**
    @param {Mailable} mailable
    @param {MailHandle} config
    */
    send(mailable: Mailable, config?: MailHandle): Promise<any>;
    /**
    @param {string} subject
    */
    subject(subject: string): Mail;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
import { Mailable } from "./Mailable";
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
