"use client";
import { useState } from "react";
import { acceptConsentChallenge, rejectConsentChallenge } from "@/app/(auth)/accept-consent";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

const SCOPE_PHRASES: Record<string, string> = {
  openid: "confirm your identity",
  profile: "access your basic profile information, like your name",
  email: "view your email address",
  offline_access: "access your account even when you're not actively using it",
};

function joinNatural(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export default function ConsentForm({
  consentChallenge,
  requestedScope,
  clientName,
}: {
  consentChallenge: string;
  requestedScope: string[];
  clientName?: string;
}) {
  const [loading, setLoading] = useState<"allow" | "deny" | null>(null);

  async function handleAllow() {
    setLoading("allow");
    const redirectTo = await acceptConsentChallenge(consentChallenge, requestedScope);
    window.location.href = redirectTo;
  }

  async function handleDeny() {
    setLoading("deny");
    const redirectTo = await rejectConsentChallenge(consentChallenge);
    window.location.href = redirectTo;
  }

  const permissions = joinNatural(
    (requestedScope ?? []).map((s) => SCOPE_PHRASES[s] ?? s)
  );

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Authorize {clientName ?? "this app"}</CardTitle>
        <CardDescription>Review the access being requested before continuing.</CardDescription>
      </CardHeader>
      <CardContent className="-mb-(--card-spacing)">
        <div className="-mx-(--card-spacing) max-h-80 space-y-4 overflow-y-auto border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
          <p>
            By continuing, you&apos;re giving <strong>{clientName ?? "this app"}</strong> permission
            to {permissions}.
          </p>
          <p>
            This app will not be able to access anything beyond what&apos;s listed above, and you
            can revoke this access at any time from your account settings.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline" disabled={!!loading} onClick={handleDeny}>
          {loading === "deny" ? "Denying..." : "Decline"}
        </Button>
        <Button disabled={!!loading} onClick={handleAllow}>
          {loading === "allow" ? "Authorizing..." : "Allow"}
        </Button>
      </CardFooter>
    </Card>
  );
}
