import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/components/ui/card'
import { TabsContent } from '@components/components/ui/tabs'
import type EmailSent from './EmailSentTab'
import type { campaign } from '@t/campaign/campign'
import EmailCard from './EmailCard'
import CreateEmail from './CreateEmail'
import CreateEmailDialog from './CreateEmailDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmail } from '@services/email-sent/emai.api'
import { customToast } from '@utils/toast'

interface EmailTabContentProps {
    details: campaign;
    handleSendImmediately: () => void;
    handleSchedule: () => void

}

function EmailTabContent({ details, handleSendImmediately, handleSchedule, showScheduleDialog, setShowScheduleDialog, scheduledDate, setScheduledDate, formattedDate, handleConfirmSchedule, scheduledTime, setScheduledTime, setActiveTab }: any) {

    const [createEmailDialogOpen, setCreateEmailOpendDialogOpen] = useState(false)

    const toggleCreateEmailDialog = () => {
        setCreateEmailOpendDialogOpen(prev => !prev)
    }

    const queryClient = useQueryClient()

    const emailMutation = useMutation({
        mutationFn: (params: {campaignId: number, payload: {body?: string | undefined, subject?: string | undefined}}) => createEmail(params.campaignId, params.payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['campaign']})
            customToast('success','Email created')
            toggleCreateEmailDialog()
        },
        onError: (err) => {
            console.log(err)
        }

    })

    const handleCreateEmail = (data: { subject?: string | undefined; body?: string | undefined }) => {
        emailMutation.mutate({campaignId: details.id, payload: data})
    }

    return (
        <TabsContent value="attachments" className="space-y-3 mt-3">
            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="py-2 px-4 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
                    <CardTitle className="text-gray-800 text-sm">Sent Emails</CardTitle>
                    <CardDescription className="text-xs">
                        Email delivery history for this campaign
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                    {details?.emailSent && details.emailSent.length > 0 ? (
                        <div className="space-y-4">
                            {details.emailSent.map((email: EmailSent, index: number) => (
                                <EmailCard
                                    index={index}
                                    email={email}
                                    deatils={details}
                                    handleSendImmediately={handleSendImmediately}
                                    handleSchedule={handleSchedule}

                                />
                            ))}
                        </div>
                    ) : (
                        <CreateEmail
                            toggleCreateEmailDialog={toggleCreateEmailDialog}
                            details={details}
                            setActiveTab={setActiveTab}
                        />
                    )}
                </CardContent>
            </Card>

            {/* create email form */}
            <CreateEmailDialog
                isOpen={createEmailDialogOpen}
                onClose={toggleCreateEmailDialog}
                campaign={details}
                onSubmit={handleCreateEmail}
            />

        </TabsContent>
    )
}

export default EmailTabContent
