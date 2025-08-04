import { apiConnector } from "@services/api-client/api"
import type { createEmailPayload } from "@t/email-sent/create-email"

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/campaign`

export const createEmail = async (campaignId: number, payload?: createEmailPayload) => {
    try{
        const response = await apiConnector(
            `${baseUrl}/${campaignId}/create-email`,
            "POST",
            payload ? payload : null,
            null,
            null,
            false        
        )
        console.log("response", response)
    }catch(err){
        console.log("err message from create email api", err)
    }
}