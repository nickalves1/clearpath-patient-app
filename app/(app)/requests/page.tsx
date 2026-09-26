"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import RequestDialog from "@/app/(app)/_components/request-dialog"
import RequestsList from "./_components/requests-list"

export default function PageRequests() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>New Request</Button>
      </div>

      <RequestsList />

      <RequestDialog open={open} setOpen={setOpen} />
    </div>
  )
}
