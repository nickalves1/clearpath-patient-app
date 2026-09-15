import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import LoginForm from "@/app/(auth)/login/login-form";
import { acceptLoginChallenge } from "@/app/(auth)/accept-login";
import { hydraAdminFetch } from "@/app/(auth)/hydra-admin";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ login_challenge?: string }>;
}) {
  const { login_challenge } = await searchParams;

  const session = await auth();
  if (session && !login_challenge) {
    redirect("/");
  }

  if (login_challenge) {
    const res = await hydraAdminFetch(
      `/admin/oauth2/auth/requests/login?login_challenge=${login_challenge}`
    );
    const challenge = await res.json();

    if (challenge.skip) {
      const redirectTo = await acceptLoginChallenge(login_challenge, challenge.subject);
      redirect(redirectTo);
    }
  }

  return <LoginForm loginChallenge={login_challenge} />;
}