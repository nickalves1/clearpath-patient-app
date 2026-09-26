import Link from "next/link"
import { Scan } from "lucide-react"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { mockExams, examLabel } from "@/app/(app)/_lib/mock-data"

export default function PageExams() {
  return (
    <div className="flex flex-col gap-3">
      {mockExams.map((exam) => (
        <div key={exam.id} className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3 sm:hidden">
            <Avatar className="size-10 shrink-0">
              <AvatarFallback>
                <Scan className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate font-heading font-medium">
                {examLabel(exam)}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(exam.performedAt).toLocaleDateString("en-US")}
              </span>
              <span className="text-sm text-muted-foreground">
                {exam.hospital}
              </span>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link href={`/exams/${exam.id}`}>View</Link>
            </Button>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <Avatar className="size-10 shrink-0">
              <AvatarFallback>
                <Scan className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate font-heading font-medium">
                {examLabel(exam)}
              </span>
              <span className="text-sm text-muted-foreground">
                {exam.hospital}
              </span>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">
              {new Date(exam.performedAt).toLocaleDateString("en-US")}
            </span>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link href={`/exams/${exam.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
