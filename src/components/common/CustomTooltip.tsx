import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@components/components/ui/tooltip'
import { TooltipContent } from '@components/components/ui/tooltip'
import { Link } from 'react-router-dom'

function CustomTooltip({ children, link, content, customStyle = false }: {
    children: React.ReactNode,
    link?: string,
    content: string,
    customStyle?: boolean
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {
                        link ? (
                            <Link to={link!} className="flex justify-center  transition-all">
                                {children}
                            </Link>

                        ) : (
                            children
                        )
                    }

                </TooltipTrigger>
                <TooltipContent>
                    <p className={`${customStyle ? "w-[220px]" : ""}`}>
                        {content}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip
