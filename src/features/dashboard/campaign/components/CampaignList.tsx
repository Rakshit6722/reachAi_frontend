import { getCampaignService } from '@services/campaign/campaign.api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CampaignCard from './CampaignCard'
import { Skeleton } from '@components/components/ui/skeleton'
import { Search } from 'lucide-react'
import { Input } from '@components/components/ui/input'
import SkeletonDivs from '@components/common/layout/Skeleton'
import Error from '@components/common/layout/Error'
import { formatDate } from '@utils/campaign'
import EmptyCampaignListPlaceholder from './EmptyCampaignListPlaceholder'
import CustomTab from '@components/common/CustomTab'
import { TableHeader, TabList } from '@constants/dashboard/campaign.constant'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../router/routes'
import type { campaign } from '@t/campaign/campign'

function CampaignList() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filter, setFilter] = React.useState('all');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['campaigns'],
        queryFn: getCampaignService,
    })

    const allCampaigns = data?.data?.data?.campaign || [];

    const campaigns = React.useMemo(() => {
        return allCampaigns.filter((campaign: any) => {
            const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' || campaign.status?.toLowerCase() === filter;
            return matchesSearch && matchesFilter;
        });
    }, [allCampaigns, searchTerm, filter]);

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                    <div className="relative flex-1 max-w-md">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-64 rounded-md" />
                </div>

                <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <div className="grid grid-cols-12 gap-4 px-5 py-3 text-sm font-medium text-gray-500 border-b border-gray-100 bg-gray-50">
                        {
                            TableHeader.map((item, index) => (
                                <div key={index} className={`
                                    ${index === 0 ? "col-span-4" : "col-span-2"} 
                                    ${index === 1 ? "hidden md:block" : ""}
                                    ${index === TableHeader.length - 1 ? "text-right" : ""}
                                `}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>

                    <SkeletonDivs />
                </div>
            </div>
        )
    }

    // Error state
    if (isError) {
        return (
            <Error error={error} />
        )
    }

    // Empty state
    if (allCampaigns.length === 0) {
        return (
            <EmptyCampaignListPlaceholder />
        )
    }

    // Empty search results
    if (campaigns.length === 0) {
        return (
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            className="pl-9"
                            placeholder="Search campaigns"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <CustomTab value={filter} onValueChange={setFilter} content={TabList} />
                </div>

                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-lg border">
                    <Search className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matching campaigns</h3>
                    <p className="text-gray-500 max-w-md mb-6">
                        No campaigns match your search or filter criteria. Try adjusting your search or clear filters.
                    </p>
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                            setSearchTerm('');
                            setFilter('all');
                        }}
                    >
                        Clear filters
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        className="pl-9"
                        placeholder="Search campaigns"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <CustomTab value={filter} onValueChange={setFilter} content={TabList} />
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 text-sm font-medium text-gray-500 border-b border-gray-100 bg-gray-50">
                    {TableHeader.map((item, index) => (
                        <div key={index} className={`
                            ${index === 0 ? "col-span-4" : "col-span-2"} 
                            ${index === 1 ? "hidden md:block" : ""}
                            ${index === TableHeader.length - 1 ? "text-right" : ""}
                        `}>
                            {item}
                        </div>
                    ))}
                </div>

                {/* Campaign cards */}
                <div className="divide-y divide-gray-100">
                    {campaigns.map((campaign: campaign) => (
                        <NavLink to={`/dashboard/campaigns/${campaign.id}`}>
                            <CampaignCard
                                id={campaign.id}
                                key={campaign.id}
                                name={campaign.name}
                                status={campaign?.status || 'draft'}
                                createdAt={formatDate(campaign?.createdAt)}
                                leadsLength={campaign?.leads?.length || 0}
                            />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CampaignList
