export interface EmailReceiver {
    from : string,
    to : string,
    subject: string,
    data: string | undefined
}