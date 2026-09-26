"use server"

import { hydraAdminFetch } from "@/app/(auth)/_lib/hydra-admin"

export async function acceptLogoutChallenge(logoutChallenge: string) {
  const res = await hydraAdminFetch(
    `/admin/oauth2/auth/requests/logout/accept?logout_challenge=${logoutChallenge}`,
    { method: "PUT" },
  )
  const data = await res.json()
  if (!res.ok) throw new Error("Failed to accept logout challenge")
  return data.redirect_to as string
}
