import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/components/ui/card'
import { TabsContent } from '@components/components/ui/tabs'
import { ChevronRight, Users } from 'lucide-react'
import React from 'react'
import LeadCard from '../leads/LeadCard'
import type { Lead } from '@t/campaign/lead'

type LeadDetailProps = {
    leadsCount: number,
    details: {
        id: number,
        userId: number,
        name: string,
        body: string,
        subject: string,
        status: string,
        createdAt: string,
        emailSent: Array<any>,
        leads: Array<any>
    },
}

function LeadDetailTab({ leadsCount, details }: LeadDetailProps) {

    const activeLeadCount = details?.leads?.filter((lead: Lead) => lead.shouldSend)

    return (
        <TabsContent value="leads" className="space-y-3 mt-3">
            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="py-2 px-4 bg-gradient-to-r from-green-50 to-white border-b border-gray-100">
                    <CardTitle className="text-gray-800 text-sm">Campaign Leads</CardTitle>
                    <CardDescription className="text-xs">
                        {activeLeadCount.length} contacts will receive this campaign
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                    {leadsCount > 0 ? (
                        <div className="space-y-2">
                            {details?.leads?.map((lead, index) => (
                                <LeadCard index={index} lead={lead} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <Users className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                            <p className="text-gray-500 text-sm">No leads have been added to this campaign yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default LeadDetailTab
