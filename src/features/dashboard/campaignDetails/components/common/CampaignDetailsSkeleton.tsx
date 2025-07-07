import SkeletonDivs from "@components/common/layout/Skeleton";
import { Card, CardContent } from "@components/components/ui/card";
import { Skeleton } from "@components/components/ui/skeleton";

export default function CampaignDetailsSkeleton() {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-3 rounded-lg border border-gray-100">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-24 mt-2 md:mt-0" />
      </div>

      <SkeletonDivs/>

      {/* Tabs skeleton */}
      <div>
        <div className="flex border-b border-gray-200 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-24 mx-1" />
          ))}
        </div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
