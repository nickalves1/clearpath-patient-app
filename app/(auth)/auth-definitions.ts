import * as z from "zod";

export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export type SigninFormValues = z.infer<typeof SigninFormSchema>;

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
} | undefined;


export const SignupFormSchema = z
  .object({
    name: z.string().min(2, { error: "Name must be at least 2 characters long." }).trim(),
    email: z.email({ error: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long." })
      .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
      .regex(/[0-9]/, { error: "Password must contain at least one number." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const SigninFormSchema = z
  .object({
    email: z.email({ error: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { error: "Please enter a valid password." }),
  });