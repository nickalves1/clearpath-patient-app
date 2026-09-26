import { SidebarProvider, SidebarInset } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/(app)/_components/app-sidebar"
import { SiteHeader } from "@/app/(app)/_components/site-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 13)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
