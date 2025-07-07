import { toggleShouldSendService } from '@services/leads/leads.api'
import type { Lead } from '@t/campaign/lead'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'

function useToggleShouldSend(lead: Lead, campaignId?: number) {
    const [isActive, setIsActive] = useState(lead.shouldSend ?? true)

    const queryClient = useQueryClient()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: () => toggleShouldSendService(lead.id),
        onSuccess: (_, newStatus: boolean) => {
            setIsActive(newStatus)

            if (campaignId) {
                queryClient.invalidateQueries({
                    queryKey: ['campaign', campaignId!.toString()]
                })
            }

        },
        onError: () => {
            setIsActive(!isActive)
        }
    })

    const handleToggle = useCallback((checked: boolean) => {
        mutate(checked)
    }, [mutate])


    return {
        isActive,
        handleToggle,
        isPending,
        isError
    }

}

export default useToggleShouldSend
