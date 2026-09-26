import Link from "next/link"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { StatusBadge } from "@/app/(app)/_components/status-badge"
import {
  mockRequests,
  getExamById,
  getDestinationById,
  examLabel,
} from "@/app/(app)/_lib/mock-data"

export default function RequestsList() {
  return (
    <div className="flex flex-col gap-3">
      {mockRequests.map((request) => {
        const exam = getExamById(request.examId)
        const destination = getDestinationById(request.destinationId)
        const primaryLabel = exam ? examLabel(exam) : "Unknown exam"

        return (
          <div
            key={request.id}
            className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-10 shrink-0">
                <AvatarFallback>
                  {exam?.hospital.charAt(0) ?? "?"}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate font-heading font-medium sm:hidden">
                {primaryLabel}
              </span>
              <div className="flex shrink-0 items-center gap-2 sm:hidden">
                <StatusBadge status={request.status} />
                <Button asChild variant="outline" size="sm">
                  <Link href={`/exams/${request.examId}`}>View</Link>
                </Button>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="hidden truncate font-heading font-medium sm:block">
                {primaryLabel}
              </span>
              <span className="text-sm text-muted-foreground sm:hidden">
                {new Date(request.requestedAt).toLocaleDateString("en-US")}
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">From: </span>
                {exam?.hospital ?? "Unknown hospital"}
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">To: </span>
                {destination?.name ?? "Unknown destination"}
              </span>
            </div>

            <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">
              {new Date(request.requestedAt).toLocaleDateString("en-US")}
            </span>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <StatusBadge status={request.status} />
              <Button asChild variant="outline" size="sm">
                <Link href={`/exams/${request.examId}`}>View</Link>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
