import { Button } from '@components/components/ui/button'
import type { campaign } from '@t/campaign/campign'
import { Mail, PlusCircle, UserPlus, AlertCircle } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type createEmailProps = {
    details: campaign,
    toggleCreateEmailDialog: any,
    setActiveTab: (value: string) => void
}

function CreateEmail({ details, toggleCreateEmailDialog, setActiveTab }: createEmailProps) {
    const hasLeads = details?.leads && details.leads.length > 0
    
    return (
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200 shadow-sm">
            <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center shadow-sm">
                {hasLeads ? (
                    <Mail className="h-8 w-8 text-purple-300" />
                ) : (
                    <AlertCircle className="h-8 w-8 text-amber-300" />
                )}
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mt-3 mb-2">
                {hasLeads ? 'No Emails Available' : 'No Leads Found'}
            </h3>
            
            <p className="text-gray-500 text-sm max-w-md text-center mb-2">
                {hasLeads 
                    ? 'Create your first email to start reaching out to your leads.'
                    : 'You need to add at least one lead before you can create an email.'}
            </p>
            
            {details?.status?.toLowerCase() === 'draft' && (
                <p className="text-xs text-gray-400 mb-4">
                    {hasLeads 
                        ? 'Your campaign is in draft mode and ready for emails'
                        : 'Your campaign is in draft mode. Add leads to continue'}
                </p>
            )}
            
            {hasLeads ? (
                <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-4 py-2 shadow-sm"
                    size="lg"
                    onClick={toggleCreateEmailDialog}
                >
                    <PlusCircle className="h-5 w-5" />
                    Create Email
                </Button>
            ) : (
                <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 shadow-sm"
                    size="lg"
                    onClick={() => setActiveTab("leads")}
                >
                    <UserPlus className="h-5 w-5" />
                    Add Leads First
                </Button>
            )}
        </div>
    )
}

export default CreateEmail
