"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignupFormSchema, SignupFormValues } from "@/app/(auth)/auth-definitions";
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
import { createRegistrationFlow, submitRegistrationFlow } from "@/app/(auth)/kratos";
import { acceptLoginChallenge } from "@/app/(auth)/accept-login";

export default function RegisterForm({ loginChallenge }: { loginChallenge?: string }) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

    const [flow, setFlow] = useState<any>(null);

    useEffect(() => {
        createRegistrationFlow().then(setFlow);
    }, []);

  async function onSubmit(data: SignupFormValues) {
    if (!flow) return;
    const csrfNode = flow.ui.nodes.find((n: any) => n.attributes.name === "csrf_token");

    try {
        const result = await submitRegistrationFlow(
        flow.id, csrfNode.attributes.value, data.email, data.name, data.password
        );
        if (loginChallenge) {
        const redirectTo = await acceptLoginChallenge(loginChallenge, result.identity.id);
        window.location.href = redirectTo;
        } else {
        toast.success("Account created!");
        }
    } catch (err) {
        toast.error((err as Error).message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="confirm-password"
                    type="password"
                    placeholder="•••••••••••••"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>Please confirm your password.</FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href={loginChallenge ? `/login?login_challenge=${loginChallenge}` : "/login"}>
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
