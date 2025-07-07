import React from 'react'
import { format } from 'date-fns'
import { getStatusColors } from '@utils/campaign'
import CampaignDetailsHeader from './campaignDetailsHeader/CampaignDetailsHeader'
import CampaignDetailsStatCards from './CampaignDetailsStatCards'
import CampaignDetailTabs from './CampaignDetailTabs'

type CampaignDetailProps = {
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
  }
}

function CampaignDetail({ details }: CampaignDetailProps) {
  const statusColor = getStatusColors(details?.status ?? 'draft')
  const formattedDate = format(new Date(details?.createdAt ?? new Date()), 'MMM dd, yyyy')
  const leadsCount = details?.leads?.length || 0

  return (
    <div className="space-y-4 bg-gray-50  rounded-lg border border-gray-100 shadow-sm">
      {/* Campaign Header */}
      <CampaignDetailsHeader id={details?.id} name={details?.name} date={formattedDate} status={details?.status} statusColor={statusColor} />


      {/* Campaign Stats Cards */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
        <CampaignDetailsStatCards leadCount={leadsCount} status={details?.status} emailSent={details?.emailSent?.length} />
      </div>


      {/* Campaign Details Tabs */}
      <CampaignDetailTabs details={details} leadsCount={leadsCount}  />
    </div>
  )
}

export default CampaignDetail
