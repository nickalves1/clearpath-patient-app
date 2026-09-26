"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  CalendarDays,
  FileText,
  FileX,
  Lock,
  Mail,
  MapPin,
  MoreHorizontalIcon,
  Phone,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Separator } from "@/app/components/ui/separator"
import { Skeleton } from "@/app/components/ui/skeleton"
import RequestDialog from "@/app/(app)/_components/request-dialog"
import { StatusBadge } from "@/app/(app)/_components/status-badge"
import {
  getDestinationById,
  getExamById,
  getHospitalByName,
  getRequestsByExamId,
  examLabel,
  isExamUnlocked,
  type RequestStatus,
} from "@/app/(app)/_lib/mock-data"

export default function ExamDetailPage() {
  const params = useParams<{ id: string }>()
  const [open, setOpen] = useState(false)

  const exam = getExamById(params.id)

  if (!exam) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-8 text-center shadow-sm">
        <FileX className="size-8 text-muted-foreground" />
        <p className="font-heading font-medium">Exam not found</p>
        <p className="text-sm text-muted-foreground">
          This exam doesn&apos;t exist or may have been removed.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/exams">Back to Exams</Link>
        </Button>
      </div>
    )
  }

  const hospital = getHospitalByName(exam.hospital)
  const requests = getRequestsByExamId(exam.id)
  const unlocked = isExamUnlocked(exam.id)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-xl border p-4 bg-card shadow-sm items-center gap-8">
        <Avatar className="size-20 shrink-0">
          <AvatarFallback>
            <Building2 className="size-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-3">
          <h2 className="font-heading text-lg font-medium break-words">
            {exam.hospital}
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span className="break-words">
                {hospital?.address ?? "Address not available"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4 shrink-0" />
              <span>{hospital?.phone ?? "Phone not available"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4 shrink-0" />
              <span className="break-all">
                {hospital?.email ?? "Email not available"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border p-4 bg-card shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 className="font-heading font-medium break-words">
              {examLabel(exam)}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 shrink-0" />
              <span>
                {new Date(exam.performedAt).toLocaleDateString("en-US")}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {unlocked && (
              <Button variant="outline" size="sm">
                <FileText className="size-4" />
                View Report
              </Button>
            )}
            <Button onClick={() => setOpen(true)}>Request Release</Button>
          </div>
        </div>

        <Separator className="my-4" />

        {unlocked ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  Accession #:{" "}
                </span>
                {exam.accessionNumber}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  Referring physician:{" "}
                </span>
                {exam.referringPhysician}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  Radiologist:{" "}
                </span>
                {exam.radiologist}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  Report status:{" "}
                </span>
                {exam.reportStatus}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  Indication:{" "}
                </span>
                {exam.notes}
              </div>
            </div>
            <div className="rounded-lg border bg-muted/40 p-3">
              <p className="mb-1 text-xs font-medium text-foreground/70">
                Findings
              </p>
              <p className="text-sm text-muted-foreground">{exam.findings}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-4 text-center">
            <Lock className="size-5 text-muted-foreground" />
            <div className="flex w-full flex-col items-center gap-1.5">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Exam details are locked. Request release to yourself to view them.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border p-4 bg-card shadow-sm">
        <h2 className="font-heading font-medium">Requests for this exam</h2>

        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No release requests yet for this exam.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {requests.map((request) => {
              const destination = getDestinationById(request.destinationId)
              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {destination?.name ?? "Unknown destination"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(request.requestedAt).toLocaleDateString(
                        "en-US",
                      )}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={request.status} />
                    <RequestActions status={request.status} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <RequestDialog open={open} setOpen={setOpen} initialExamId={exam.id} />
    </div>
  )
}

function RequestActions({ status }: { status: RequestStatus }) {
  if (status !== "Ready" && status !== "Pending" && status !== "Approved") {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 shrink-0">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {status === "Ready" && <DropdownMenuItem>Share</DropdownMenuItem>}
        {(status === "Pending" || status === "Approved") && (
          <DropdownMenuItem variant="destructive">
            Cancel Request
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
