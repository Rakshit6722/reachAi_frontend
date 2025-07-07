import React from 'react'
import { Skeleton } from '@components/components/ui/skeleton'


function SkeletonDivs() {
    return (
        <div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-100 last:border-0">
                    <div className="grid grid-cols-12 gap-4 items-center px-5 py-4">
                        <div className="col-span-4 flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div>
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-16 mt-1" />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="col-span-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <div className="col-span-2">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-1.5 w-24 mt-1.5" />
                        </div>
                        <div className="col-span-2 flex justify-end gap-1">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonDivs
