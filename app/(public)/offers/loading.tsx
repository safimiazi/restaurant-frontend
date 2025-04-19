import { Skeleton } from "@/components/ui/skeleton"

export default function OffersLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Skeleton className="h-12 w-full max-w-xs" />
      </div>
    </div>
  )
}
