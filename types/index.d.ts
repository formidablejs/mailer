export var Mail: {
    new (emails: string | string[]): import("./Mail");
    to(emails: string | string[]): import("./Mail");
    configure(config: any): any;
};
export var Mailable: {
    new ($$?: any): import("./Mailable");
};
export var MailServiceResolver: {
    new (app: any): import("./MailServiceResolver");
};
