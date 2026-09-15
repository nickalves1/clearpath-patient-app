import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import RegisterForm from "@/app/(auth)/register/register-form";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ login_challenge?: string }>;
}) {
  const { login_challenge } = await searchParams;

  const session = await auth();
  if (session && !login_challenge) {
    redirect("/");
  }

  return <RegisterForm loginChallenge={login_challenge} />;
}