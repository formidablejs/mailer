export interface Envelope {
    /** includes an address object or is set to false */
    from: string | false;
    /** includes an array of address objects */
    to: string[];
}

export interface Address {
    name: string;
    address: string;
}

export type SentMessageInfo = {
    /** includes the envelope object for the message */
    envelope: Envelope;
    /** most transports should return the final Message-Id value used with this property */
    messageId: string;
    accepted: Array<string | Address>;
    rejected: Array<string | Address>;
    pending: Array<string | Address>;
    response: string;
}

export type MailHandle = {
    onSuccess?: (response: SentMessageInfo) => void;
    onError?: (reason: any) => void;
    onComplete?: () => void;
}
