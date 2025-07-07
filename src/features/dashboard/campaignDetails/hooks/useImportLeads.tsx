import type { createLeadPayload } from '@schemas/lead.schema'
import { createLeadService } from '@services/leads/leads.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customToast } from '@utils/toast'
import React, { useState } from 'react'



function useImportLeads(campaignId: number) {
    const [payload, setPayload] = useState<createLeadPayload>({
        email: '',
        firstName: '',
        lastName: '',
        company: ''
    })

    const queryClient = useQueryClient()

    const createLeadMutation = useMutation({
        mutationFn: () => createLeadService(campaignId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign', campaignId.toString()] })
            customToast('success', 'Lead imported successfully')
        }, onError: (err: any) => {
            customToast('error', err?.message || 'Unable to import lead, please try again later')
        }
    })

    return {
        payload,
        setPayload,
        createLeadMutation
    }
}

export default useImportLeads
