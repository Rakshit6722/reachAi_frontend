import type { createLeadPayload, csvPayload } from "@schemas/lead.schema"
import { apiConnector } from "@services/api-client/api"

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`


export const createLeadService = async (id: number, payload: createLeadPayload) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/campaigns/${id}/leads`,
            "POST",
            payload,
            null,
            null,
            false
        )

        if (response?.status !== 201) {
            throw new Error(response?.data?.message)
        }
        return response
    } catch (err: any) {
        if (err?.response?.status === 409) {
            throw new Error("Lead with this email already exist")
        } else if (err?.response?.status === 400) {
            throw new Error("unable to import lead, please try again later")
        } else {
            throw new Error(err?.message || "Internal Server Error")
        }
    }
}

export const uploadCsvService = async (id: number, payload: csvPayload) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/campaigns/${id}/leads/upload`,
            "POST",
            payload,
            null,
            null,
            true
        )

        if (response?.status !== 201) {
            throw new Error(response?.data?.message)
        }
        return response
    } catch (err: any) {
        if (err?.response?.status === 409) {
            throw new Error("Lead with this email already exist")
        } else if (err?.response?.status === 400) {
            throw new Error("unable to import lead, please try again later")
        } else {
            throw new Error(err?.message || "Internal Server Error")
        }
    }
}

export const getCampaignLeadService = async (campaignId: number) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/campaign/leads/${campaignId}`,
            "GET",
            null,
            null,
            null,
            false
        )

        if (response?.status !== 200) {
            throw new Error(response?.data?.message || 'Internal Server Error')
        }

        return response
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error("Campaign Id missing or invalid campaign Id")
        } else if (err?.response?.status === 400) {
            throw new Error("Unable to get camapigns leads, please try again")
        } else {
            throw new Error(err?.message || 'Internal Server Error')
        }
    }
}

export const updateCampaignService = async (leadId: number, payload: createLeadPayload) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/leads/${leadId}`,
            "PUT",
            payload,
            null,
            null,
            false
        )

        if (response?.status !== 200) {
            throw new Error(response?.data?.message || "Internal Server Error")
        }
        return response
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error("Invalid leadId")
        } else if (err?.response?.status === 400) {
            throw new Error("Unable to update lead")
        } else {
            throw new Error(err?.message || 'Internal Server Error')
        }
    }
}
export const deleteCampaignService = async (leadId: number) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/leads/${leadId}`,
            "DELETE",
            null,
            null,
            null,
            false
        )

        if (response?.status !== 200) {
            throw new Error(response?.data?.message || "Internal Server Error")
        }
        return response
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error("Invalid leadId")
        } else if (err?.response?.status === 400) {
            throw new Error("Unable to delete lead")
        } else {
            throw new Error(err?.message || 'Internal Server Error')
        }
    }
}

export const toggleShouldSendService = async (leadId: number) => {
    try {
        const response = await apiConnector(
            `${BASE_URL}/leads/toggle/${leadId}`,
            "GET",
            null,
            null,
            null,
            false
        )

        if (response?.status !== 200) {
            throw new Error(response?.data?.message || "Internal Server Error")
        }
        return response
    } catch (err: any) {
        if (err?.response?.status === 422) {
            throw new Error("Invalid leadId")
        } else if (err?.response?.status === 400) {
            throw new Error("Unable to update lead")
        } else {
            throw new Error(err?.message || 'Internal Server Error')
        }
    }
}