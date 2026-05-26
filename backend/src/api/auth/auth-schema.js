import { z } from "zod";

export const EmailPasswordRegisterSchema = z.object({
  firstName: z
    .string()
    .min(3, "Name too short")
    .max(50, "Name too long"),

  lastName: z
    .string()
    .min(3, "Name too short")
    .max(50, "Name too long"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});


export const EmailPasswordLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z.string()
});
