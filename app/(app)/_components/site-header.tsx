"use client"
import { usePathname } from "next/navigation"
import { Separator } from "@/app/components/ui/separator"
import { SidebarTrigger } from "@/app/components/ui/sidebar"

const TITLES: Record<string, string> = {
  "/": "Home",
  "/exams": "Exams",
  "/requests": "Requests",
  "/chat": "Chat",
  "/profile": "Profile",
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? "Clearpath"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 self-center!"
        />
        <h1 className="font-heading text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}
