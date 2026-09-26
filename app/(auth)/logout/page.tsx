import { redirect } from "next/navigation"
import { acceptLogoutChallenge } from "@/app/(auth)/_lib/accept-logout"

export default async function LogoutPage({
  searchParams,
}: {
  searchParams: Promise<{ logout_challenge?: string }>
}) {
  const { logout_challenge } = await searchParams

  if (!logout_challenge) return <div>Missing logout_challenge</div>

  const redirectTo = await acceptLogoutChallenge(logout_challenge)
  redirect(redirectTo)
}
