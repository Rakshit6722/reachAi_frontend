export type Lead = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    company: string,
    shouldSend: boolean,
    customSubject: string | null,
    customBody: string | null
}