export type EmailSent = {
    id: number;
    campaignId: number;
    subject: string;
    body: string;
    status: string;
    order?: number;
    sendAfterDays?: number;
    createdAt: string;
    updatedAt: string;
}