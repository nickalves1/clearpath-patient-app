"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "@/app/(auth)/auth";
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

export default function RegisterPage() {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: SigninFormValues) {
    const result = await login(data);

    if (result?.errors) {
      (Object.keys(result.errors) as Array<keyof SigninFormValues>).forEach((field) => {
        const message = result.errors?.[field]?.[0];
        if (message) {
          form.setError(field, { message });
        }
      });
      return;
    }

    if (result?.message) {
      toast.success(result.message);
      form.reset();
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
                Don't have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
