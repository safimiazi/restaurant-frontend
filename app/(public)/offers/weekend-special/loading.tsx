import { Skeleton } from "@/components/ui/skeleton"

export default function WeekendSpecialLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-80 w-full rounded-lg" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
