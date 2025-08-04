import { Card, CardContent, CardHeader, CardTitle } from '@components/components/ui/card'
import { Paperclip, Send, Users } from 'lucide-react'
import React from 'react'

type StatProps = {
    leadCount: number;
    status: string;
    emailSent: number;
}

function CampaignDetailsStatCards({ leadCount, status, emailSent }: StatProps) {
    return (
        <>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-3 bg-gradient-to-r from-blue-50 to-white rounded-t-lg border-b border-gray-100">
                    <CardTitle className="text-sm font-medium text-blue-700">Total Leads</CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent className="pt-2 pb-3 px-3">
                    <div className="text-xl font-bold text-gray-800">{leadCount}</div>
                    <p className="text-xs text-gray-500">Contacts in this campaign</p>
                </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-3 bg-gradient-to-r from-green-50 to-white rounded-t-lg border-b border-gray-100">
                    <CardTitle className="text-sm font-medium text-green-700">Email Status</CardTitle>
                    <Send className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="pt-2 pb-3 px-3">
                    <div className="text-xl font-bold capitalize text-gray-800">{status || 'draft'}</div>
                    <p className="text-xs text-gray-500">Current campaign status</p>
                </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between py-2 px-3 bg-gradient-to-r from-purple-50 to-white rounded-t-lg border-b border-gray-100">
                    <CardTitle className="text-sm font-medium text-purple-700">Email Sent</CardTitle>
                    <Paperclip className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent className="pt-2 pb-3 px-3">
                    <div className="text-xl font-bold text-gray-800">{emailSent}</div>
                    <p className="text-xs text-gray-500">Total email sent</p>
                </CardContent>
            </Card>
        </>
    )
}

export default CampaignDetailsStatCards
