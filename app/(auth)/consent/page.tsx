import { redirect } from "next/navigation";
import ConsentForm from "@/app/(auth)/consent/consent-form";
import { acceptConsentChallenge } from "@/app/(auth)/accept-consent";
import { hydraAdminFetch } from "@/app/(auth)/hydra-admin";

export default async function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ consent_challenge?: string }>;
}) {
  const { consent_challenge } = await searchParams;
  if (!consent_challenge) return <div>Missing consent_challenge</div>;

  const res = await hydraAdminFetch(
    `/admin/oauth2/auth/requests/consent?consent_challenge=${consent_challenge}`
  );
  const challenge = await res.json();

  if (challenge.skip) {
    const redirectTo = await acceptConsentChallenge(consent_challenge, challenge.requested_scope);
    redirect(redirectTo);
  }

  return (
    <ConsentForm
      consentChallenge={consent_challenge}
      requestedScope={challenge.requested_scope}
      clientName={challenge.client?.client_name}
    />
  );
}