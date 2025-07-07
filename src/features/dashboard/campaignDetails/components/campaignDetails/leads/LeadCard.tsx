import type { Lead } from '@t/campaign/lead'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Switch } from '@components/components/ui/switch'
import CustomTooltip from '@components/common/CustomTooltip'
import useToggleShouldSend from '../../../hooks/useToggleShouldSend'
import { useParams } from 'react-router-dom'

type LeadCardProps = {
    index: number,
    lead: Lead,
    onLeadClick?: (lead: Lead) => void
}

function LeadCard({ index, lead, onLeadClick }: LeadCardProps) {
    const { campaignId } = useParams<{ campaignId: string }>()

    // Use our custom hook for all toggle logic
    const { isActive, handleToggle, isPending } = useToggleShouldSend(
        lead,
        campaignId ? Number(campaignId) : undefined
    )

    return (
        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shadow-sm">
                    {lead?.firstName?.charAt(0) || lead?.email?.charAt(0) || 'U'}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-800">{lead?.firstName || 'Unnamed Lead'}</p>
                    <p className="text-xs text-gray-500">{lead?.email || 'No email'}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <CustomTooltip content={isActive ? 'Active - Will receive emails' : 'Inactive - Will not receive emails'}>
                    <div className={isPending ? 'opacity-60 pointer-events-none' : ''}>
                        <Switch
                            checked={isActive}
                            onCheckedChange={handleToggle}
                            className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-700"
                            style={{
                                backgroundColor: isActive ? 'rgb(22 163 74)' : 'rgb(185 28 28)',
                                borderColor: isActive ? 'rgb(22 163 74)' : 'rgb(185 28 28)'
                            }}
                            disabled={isPending}
                        />
                    </div>
                </CustomTooltip>

                <CustomTooltip content={`Click to view ${lead.firstName || 'lead'} details`}>
                    <ChevronRight
                        className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
                        onClick={() => onLeadClick && onLeadClick(lead)}
                    />
                </CustomTooltip>
            </div>
        </div>
    )
}

export default LeadCard
