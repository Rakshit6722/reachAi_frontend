import React, { type FormEvent } from 'react'
import { Badge } from "@components/components/ui/badge"
import { Edit2, Trash2, Eye, PauseCircle, PlayCircle, ChevronRight } from "lucide-react"
import { Button } from "@components/components/ui/button"
import { motion } from 'framer-motion'
import { getStatusColors, getStatusIcon } from '@utils/campaign'
import CustomTooltip from '@components/common/CustomTooltip'
import EditCampaignButton from './EditCampaign'
import DeleteCampaignModal from './DeleteCampaignModal';

function CampaignCard({
    id,
    name,
    status,
    createdAt,
    leadsLength,
}: {
    id: number
    name: string,
    status: string,
    createdAt: string,
    leadsLength: number,
}) {
    const statusColor = getStatusColors(status);
    const StatusIcon = getStatusIcon(status);

    return (

        <motion.div
            className={`relative w-full bg-white group cursor-pointer hover:bg-gray-50 transition-all duration-200`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="grid grid-cols-12 gap-4 items-center px-5 py-4">
                {/* Name column */}
                <div className="col-span-4 flex items-center gap-3">
                    <div className={`h-8 rounded-full flex items-center justify-center ${statusColor}`}>
                        {StatusIcon}
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 truncate w-28" title={name}>
                            {name}
                        </h3>
                    </div>
                </div>

                <div className="col-span-2 text-sm text-gray-600 hidden md:block">
                    {createdAt}
                </div>

                {/* Status column */}
                <div className="col-span-2">
                    <Badge variant="outline" className={`capitalize ${statusColor}`}>
                        {status}
                    </Badge>
                </div>

                {/* Leads column */}
                <div className="col-span-2 text-sm font-medium text-gray-600">
                    {leadsLength} leads
                </div>

                {/* Actions column */}
                <div className="col-span-2 flex justify-end items-center gap-1">
                    {/* Edit button with modal */}
                    {status.toLowerCase() !== 'sent' && status.toLowerCase() !== 'completed' && (
                        <>
                            <CustomTooltip content="Edit campaign">
                                <div>
                                    <EditCampaignButton campaignId={id}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={(e) => e.stopPropagation()} // Prevent parent click
                                        >
                                            <Edit2 size={16} className="text-gray-600" />
                                        </Button>
                                    </EditCampaignButton>
                                </div>
                            </CustomTooltip>
                        </>
                    )}

                    {/* Delete button with modal */}
                    {status.toLowerCase() !== 'running' && (
                        <>
                            <CustomTooltip content="Delete campaign">
                                <div>
                                    <DeleteCampaignModal id={id} campaignName={name}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={(e) => e.stopPropagation()} // Prevent parent click
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </Button>
                                    </DeleteCampaignModal>
                                </div>
                            </CustomTooltip>
                        </>
                    )}

                    {/* View/open indicator */}
                    <CustomTooltip content="Click to view details">
                        <ChevronRight size={16} className="text-gray-400 ml-1" />
                    </CustomTooltip>
                </div>
            </div>
        </motion.div >

    )
}

export default CampaignCard
