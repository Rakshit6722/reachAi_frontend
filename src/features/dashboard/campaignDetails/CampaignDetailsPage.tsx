import { getCampaignDetailsService } from '@services/campaign/campaign.api'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { Button } from '@components/components/ui/button'
import { Card, CardContent } from '@components/components/ui/card'
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import CampaignDetail from './components/campaignDetails/CampaignDetail'
import CampaignDetailsSkeleton from './components/common/CampaignDetailsSkeleton'

function CampaignDetailsPage() {
  const location = useLocation()
  const path = location.pathname
  const campaignId = path.split('/')[3] //finding the campaign id to call the api to get campaign details 

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => getCampaignDetailsService(Number(campaignId))
  })

  const campaign = data?.data?.data?.campaign

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <CampaignDetailsSkeleton />
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <Card className="border-red-100 bg-red-50 mx-auto max-w-3xl mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-red-800">Failed to load campaign</h3>
              <p className="text-sm text-red-600 max-w-md">
                {error instanceof Error 
                  ? error.message 
                  : "We couldn't load the campaign details. Please try again."}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => refetch()} 
              className="mt-4 border-red-200 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Empty state (no campaign data)
  if (!campaign) {
    return (
      <Card className="border-gray-200 bg-gray-50 mx-auto max-w-3xl mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800">Campaign not found</h3>
              <p className="text-sm text-gray-600 max-w-md">
                We couldn't find the campaign you're looking for. It may have been deleted or you may not have permission to view it.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="mt-4"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Normal state with data
  return (
    <div>
      <CampaignDetail details={campaign} />
    </div>
  )
}


export default CampaignDetailsPage
