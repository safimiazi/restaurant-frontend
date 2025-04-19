import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 md:grid-cols-[300px_1fr]">
      <div className="border-r p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />

        <div className="space-y-3 pt-2">
          <Skeleton className="h-[70px] w-full" />
          <Skeleton className="h-[70px] w-full" />
          <Skeleton className="h-[70px] w-full" />
          <Skeleton className="h-[70px] w-full" />
        </div>
      </div>

      <div className="flex flex-col">
        <Skeleton className="h-16 w-full" />
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex justify-start">
              <Skeleton className="h-[60px] w-[300px]" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-[60px] w-[250px]" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-[80px] w-[350px]" />
            </div>
          </div>
        </div>
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}
