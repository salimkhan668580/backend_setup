import z from "zod";

export default {
  loginSchema: z.object({
    email: z.string().email("Invalid email format"),

    password: z.string().min(5, "Incorrect  email or password"),
  }),

  userSchema: z.object({
    name: z.string().trim().min(1, "Name is required"),

    phone: z
      .string()
      .trim()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone is too long"),

    email: z.string().trim().email("Invalid email").toLowerCase(),

    password: z.string().min(5, "Password must be at least 5 characters"),

    googleId: z.string().optional().nullable(),

    appleId: z.string().optional().nullable(),

    role: z.enum(["user"]).optional(),

    status: z.enum(["active", "blocked"]).optional(),
  }),

  verifyOtpSchema: z.object({
    email: z.string().trim().email("Invalid email"),
    otp: z.string().length(5, "OTP must be 5 digits"),
  }),

  forgotPasswordSchema: z
    .object({
      email: z.string().trim().email("Invalid email"),
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Confirm password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
};
