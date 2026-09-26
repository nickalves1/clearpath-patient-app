"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/app/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  mockExams,
  mockDestinations,
  getExamById,
  getDestinationById,
  examLabel,
  type Exam,
} from "@/app/(app)/_lib/mock-data"

export default function RequestDialog({
  open,
  setOpen,
  initialExamId,
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
  initialExamId?: string
}) {
  const [selectedExam, setSelectedExam] = useState<Exam | undefined>(
    initialExamId ? getExamById(initialExamId) : undefined,
  )
  const [type, setType] = useState("")
  const [bodyPart, setBodyPart] = useState("")
  const [hospital, setHospital] = useState("")
  const [destinationId, setDestinationId] = useState("")

  const types = useMemo(
    () => [...new Set(mockExams.map((exam) => exam.type))],
    [],
  )

  const bodyParts = useMemo(
    () => [
      ...new Set(
        mockExams
          .filter((exam) => !type || exam.type === type)
          .map((exam) => exam.bodyPart),
      ),
    ],
    [type],
  )

  const hospitals = useMemo(
    () => [
      ...new Set(
        mockExams
          .filter(
            (exam) =>
              (!type || exam.type === type) &&
              (!bodyPart || exam.bodyPart === bodyPart),
          )
          .map((exam) => exam.hospital),
      ),
    ],
    [type, bodyPart],
  )

  const matchingExams = useMemo(
    () =>
      mockExams.filter(
        (exam) =>
          (!type || exam.type === type) &&
          (!bodyPart || exam.bodyPart === bodyPart) &&
          (!hospital || exam.hospital === hospital),
      ),
    [type, bodyPart, hospital],
  )

  const selectedDestination = destinationId
    ? getDestinationById(destinationId)
    : undefined

  function clearExam() {
    setSelectedExam(undefined)
    setType("")
    setBodyPart("")
    setHospital("")
  }

  function resetAndClose() {
    setOpen(false)
    clearExam()
    setDestinationId("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedExam || !destinationId) return

    toast.success("Request submitted", {
      description: "We'll notify you once the hospital reviews it.",
    })
    resetAndClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => (isOpen ? setOpen(true) : resetAndClose())}
    >
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>New Request</DialogTitle>
            <DialogDescription>
              Choose which exam to release and where it should be sent.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            {selectedExam ? (
              <div className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="flex flex-col">
                  <span className="text-sm font-heading font-medium">
                    {examLabel(selectedExam)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedExam.hospital} —{" "}
                    {new Date(selectedExam.performedAt).toLocaleDateString(
                      "en-US",
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearExam}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted-foreground/20"
                >
                  <X className="size-3.5" />
                  <span className="sr-only">Change exam</span>
                </button>
              </div>
            ) : (
              <>
                <Field>
                  <FieldLabel htmlFor="type">Exam type</FieldLabel>
                  <Select
                    value={type}
                    onValueChange={(value) => {
                      setType(value)
                      setBodyPart("")
                      setHospital("")
                    }}
                  >
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {type && (
                  <Field>
                    <FieldLabel htmlFor="bodyPart">Body part</FieldLabel>
                    <Select
                      value={bodyPart}
                      onValueChange={(value) => {
                        setBodyPart(value)
                        setHospital("")
                      }}
                    >
                      <SelectTrigger id="bodyPart" className="w-full">
                        <SelectValue placeholder="Select a body part" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {bodyParts.map((part) => (
                          <SelectItem key={part} value={part}>
                            {part}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}

                {type && bodyPart && (
                  <Field>
                    <FieldLabel htmlFor="hospital">Hospital</FieldLabel>
                    <Select value={hospital} onValueChange={setHospital}>
                      <SelectTrigger id="hospital" className="w-full">
                        <SelectValue placeholder="Select a hospital" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {hospitals.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}

                {type && bodyPart && hospital && matchingExams.length > 0 && (
                  <div className="flex flex-col gap-2 rounded-lg border p-3">
                    {matchingExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="text-sm text-muted-foreground">
                          {new Date(exam.performedAt).toLocaleDateString(
                            "en-US",
                          )}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedExam(exam)}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <FieldSeparator />

            <Field>
              <FieldLabel htmlFor="destination">Send to</FieldLabel>
              <Select value={destinationId} onValueChange={setDestinationId}>
                <SelectTrigger id="destination" className="w-full">
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {mockDestinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.id}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDestination && (
                <p className="text-xs text-muted-foreground">
                  {selectedDestination.kind} — {selectedDestination.address}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!selectedExam || !destinationId}>
              Request Release
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
