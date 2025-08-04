import React from 'react'
import { Badge } from '@components/components/ui/badge'
import { statusConfig } from '@constants/emailSent/emailSent.constant'

function StatusBadge(status: string) {

    const config = statusConfig[status] || statusConfig['SENT']

    return (
        <Badge className={`px-2 py-1 flex items-center gap-1 ${config.bg} ${config.text}`}>
            {config.icon}
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
    )
}

export default StatusBadge
