import type { createCampaignPayload } from "@schemas/campaign.schema"
import { apiConnector } from "@services/api-client/api"

const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/campaign`

export const createCampaignService = async (payload: createCampaignPayload) => {
    try {
        const response = await apiConnector(
            baseUrl,
            "POST",
            payload,
            null,
            null,
            false
        )

        if (response?.status === 201) {
            return response
        } else {
            throw new Error("Unable to create campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        } else if (err?.response?.status === 409) {
            throw new Error("Campaign with this name already exist")
        } else {
            throw err
        }
    }
}
export const getCampaignService = async () => {
    try {
        const response = await apiConnector(
            baseUrl,
            "GET",
            null,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to get campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}
export const getCampaignDetailsService = async (id: number) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/${id}`,
            "GET",
            null,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to get campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}

export const updateCampaignService = async (id: number, payload: createCampaignPayload) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/${id}`,
            "PUT",
            payload,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to update campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}
export const deleteCampaignService = async (id: number) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/${id}`,
            "DELETE",
            null,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to delete campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}

export const updateCampaignNameService = async (id: number, payload: {name:string}) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/name/${id}`,
            "PATCH",
            payload,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to update campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}
export const updateCampaignBodyService = async (id: number, payload: {body: string}) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/body/${id}`,
            "PATCH",
            payload,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to update campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}
export const updateCampaignSubjectService = async (id: number, payload: {subject: string}) => {
    try {
        const response = await apiConnector(
            `${baseUrl}/subject/${id}`,
            "PATCH",
            payload,
            null,
            null,
            false
        )

        if (response?.status === 200) {
            return response
        } else {
            throw new Error("Unable to update campaign")
        }

    } catch (err: any) {
        if (err?.response?.status === 401) {
            throw new Error("Unauthorized")
        }
        throw err
    }
}