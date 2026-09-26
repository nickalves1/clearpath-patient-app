import { CircleCheck, CircleX, Clock } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import type { RequestStatus } from "@/app/(app)/_lib/mock-data"

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge variant="outline" className="shrink-0 px-1.5 text-muted-foreground">
      {status === "Ready" ? (
        <CircleCheck className="fill-green-500 text-white dark:fill-green-400" />
      ) : status === "Approved" ? (
        <CircleCheck className="text-green-600 dark:text-green-400" />
      ) : status === "Denied" ? (
        <CircleX className="text-red-500 dark:text-red-400" />
      ) : (
        <Clock />
      )}
      {status}
    </Badge>
  )
}
