"use server";

const HYDRA_ADMIN_URL = process.env.HYDRA_ADMIN_URL;

export async function acceptLoginChallenge(loginChallenge: string, subject: string) {
  const res = await fetch(
    `${HYDRA_ADMIN_URL}/admin/oauth2/auth/requests/login/accept?login_challenge=${loginChallenge}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to accept login challenge");
  return data.redirect_to as string;
}