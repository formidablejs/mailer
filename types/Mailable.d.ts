export class Mailable {
    constructor($$?: any);
    subject: any;
    attachments: any;
    /**
    @param {Object[]|Object} attachment
    */
    attach(attachment?: any[] | any): Mailable;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
export {};
