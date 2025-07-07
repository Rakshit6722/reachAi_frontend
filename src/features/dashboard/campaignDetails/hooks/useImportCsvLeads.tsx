import { uploadCsvService } from '@services/leads/leads.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customToast } from '@utils/toast'
import React from 'react'

function useImportCsvLeads(id: number) {

    const queryClient = useQueryClient()

    const uploadCsvMutation = useMutation({
        mutationFn: (formData: FormData) => uploadCsvService(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaign', id.toString()] })
            customToast('success','Leads imported successfully')
        },
        onError: (err: any) => {
            customToast('error', err?.message || "Unable to import leads, please try again later")
        }

    })

    return {
        uploadCsvMutation
    }
}

export default useImportCsvLeads
