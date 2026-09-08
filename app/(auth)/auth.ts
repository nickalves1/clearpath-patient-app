"use server";

import { SignupFormSchema, SignupFormValues, FormState, SigninFormValues, SigninFormSchema } from "@/app/(auth)/auth-definitions";

export async function register(data: SignupFormValues): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { message: "Invalid data." };
  }

  // TODO: call Ory Kratos here once it exists (issue clearpath-patient-app#1)
  return { message: "Account created!" };
}

export async function login(data: SigninFormValues): Promise<FormState> {
  const validatedFields = SigninFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { message: "Invalid data." };
  }

  // TODO: call Ory Kratos here once it exists (issue clearpath-patient-app#1)
  return { message: "Done!" };
}
