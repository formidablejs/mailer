export = Mailable;
declare class Mailable {
    constructor($$?: any);
    subject: any;
    attachments: any;
    /**
    @param {Object[]|Object} attachment
    */
    attach(attachment?: any[] | any): import("./Mailable");
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
