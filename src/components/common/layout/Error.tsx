import { Alert, AlertDescription, AlertTitle } from '@components/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import React from 'react'

function Error({ error }: { error: any }) {
    return (
        <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading campaigns</AlertTitle>
            <AlertDescription>
                {error?.message || "There was an error loading your campaigns. Please try again."}
            </AlertDescription>
        </Alert>
    )
}

export default Error
