import { updateCampaignNameService } from '@services/campaign/campaign.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customToast } from '@utils/toast'
import React, { useState } from 'react'

function useEditCampaignDetailHeader(id: number, name: string) {
    const [isEditing, setIsEditing] = useState(false)
    const [nameValue, setNameValue] = useState(name || 'Unnamed Campaign')
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => updateCampaignNameService(id, { name: nameValue }),
        onSuccess: () => {
            customToast('success', 'Campaign name updated successfully')
            queryClient.invalidateQueries({ queryKey: ['campaign', id.toString()] })
            setIsEditing(false)
        },
        onError: (error: any) => {
            customToast('error', error?.message || 'Failed to update campaign name')
        }
    })

    const handleEditToggle = () => {
        if (isEditing && nameValue !== name) {
            // Save changes
            mutation.mutate()
        } else {
            // Toggle edit mode
            setIsEditing(!isEditing)
            setNameValue(name || 'Unnamed Campaign') // Reset to original name when entering edit mode
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setNameValue(name || 'Unnamed Campaign')
    }

    return {
        isEditing,
        nameValue,
        setIsEditing,
        setNameValue,
        mutation,
        handleEditToggle,
        handleCancel
    }
}

export default useEditCampaignDetailHeader
