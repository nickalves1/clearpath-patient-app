"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SigninFormValues, SigninFormSchema } from "@/app/(auth)/auth-definitions";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState } from "react";
import { createLoginFlow, submitLoginFlow, whoAmI } from "@/app/(auth)/kratos";
import { acceptLoginChallenge } from "@/app/(auth)/accept-login";
import { signIn, useSession } from "next-auth/react";


export default function LoginForm({ loginChallenge }: { loginChallenge?: string }) {
    const [flow, setFlow] = useState<any>(null);
    const form = useForm<SigninFormValues>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: { email: "", password: "" },
    });

    const { status } = useSession();

    useEffect(() => {
      if (status === "loading") return;
      if (status === "authenticated") return;
      if (!loginChallenge) {
        signIn("hydra", { redirectTo: "/" });
        return;
      }

      whoAmI().then((session) => {
        if (session) {
          acceptLoginChallenge(loginChallenge, session.identity.id).then((redirectTo) => {
            window.location.href = redirectTo;
          });
          return;
        }
        createLoginFlow().then(setFlow);
      });
    }, [loginChallenge, status]);

  async function onSubmit(data: SigninFormValues) {
    if (!flow) return;
    const csrfNode = flow.ui.nodes.find((n: any) => n.attributes.name === "csrf_token");

    try {
        const result = await submitLoginFlow(flow.id, csrfNode.attributes.value, data.email, data.password);
        if (loginChallenge) {
        const redirectTo = await acceptLoginChallenge(loginChallenge, result.session.identity.id);
        window.location.href = redirectTo;
        } else {
        toast.success("Logged in!");
        }
    } catch (err) {
        toast.error((err as Error).message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
            Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="•••••••••••••"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Login..." : "Login"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Don't have an account?{" "}
                <a href={loginChallenge ? `/register?login_challenge=${loginChallenge}` : "/register"}>
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
