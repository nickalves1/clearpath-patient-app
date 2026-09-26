import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { Scan, CloudUpload } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Separator } from "@/app/components/ui/separator"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { DatePicker } from "@/app/(app)/_components/date-birth"

export default function Profile() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 p-4 bg-card rounded-sm shadow-sm">
        <div className="flex gap-3 items-center">
          <Avatar className="size-35 shrink-0">
            <AvatarFallback>
              <Scan className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3">
            <span className="truncate font-heading font-medium">
              Profile Picture
            </span>
            <div className="flex gap-1">
              <Button>
                <CloudUpload />
                Upload Image
              </Button>
              <Button variant="secondary">Remove</Button>
            </div>
            <span className="text-sm text-muted-foreground">
              We support PNG and JPGE under 10MB
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-4 bg-card rounded-sm shadow-sm">
        <div className="flex flex-col gap-3">
          <span className="font-heading font-medium">Security</span>
          <Separator />
        </div>
        <div className="flex gap-3 items-start">
          <div className="flex flex-col gap-3 max-w-md w-full">
            <Label>Full Name</Label>
            <Input />
          </div>
          <DatePicker />
        </div>

        <div className="flex gap-3 items-start">
          <div className="flex flex-col gap-3 max-w-md w-full">
            <Label>E-mail</Label>
            <Input />
            <span className="text-sm text-muted-foreground">
              Used to log in your account
            </span>
          </div>
          <div className="flex flex-col gap-3 w-44">
            <Label>Phone</Label>
            <Input />
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-md w-full">
          <Label>Medical Record Number</Label>
          <Input disabled placeholder="Assigned by your provider" />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Address</Label>
          <Input placeholder="Street address" className="max-w-md" />
          <div className="flex gap-3">
            <Input placeholder="City" className="max-w-xs" />
            <Input placeholder="State" className="w-20" />
            <Input placeholder="ZIP Code" className="w-28" />
          </div>
        </div>

        <Button className="self-start">Save Changes</Button>
      </div>

      <div className="flex flex-col gap-8 p-4 bg-card rounded-sm shadow-sm">
        <div className="flex flex-col gap-3">
          <span className="font-heading font-medium">Security</span>
          <Separator />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Password</span>
            <span className="text-sm text-muted-foreground">
              Change your account password
            </span>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">
              Two-Factor Authentication
            </span>
            <span className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </span>
          </div>
          <Button variant="outline">Enable</Button>
        </div>
      </div>
    </div>
  )
}
