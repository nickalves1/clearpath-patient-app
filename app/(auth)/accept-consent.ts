"use server";

const HYDRA_ADMIN_URL = process.env.HYDRA_ADMIN_URL;

export async function acceptConsentChallenge(consentChallenge: string, grantScope: string[]) {
  const res = await fetch(
    `${HYDRA_ADMIN_URL}/admin/oauth2/auth/requests/consent/accept?consent_challenge=${consentChallenge}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grant_scope: grantScope, remember: true, remember_for: 3600 }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to accept consent challenge");
  return data.redirect_to as string;
}

export async function rejectConsentChallenge(consentChallenge: string) {
  const res = await fetch(
    `${HYDRA_ADMIN_URL}/admin/oauth2/auth/requests/consent/reject?consent_challenge=${consentChallenge}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "access_denied", error_description: "User denied access" }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to reject consent challenge");
  return data.redirect_to as string;
}