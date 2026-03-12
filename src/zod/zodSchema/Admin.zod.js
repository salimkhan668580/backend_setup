import { z } from "zod";

export default {
  adminCreate: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Invalid email address"),

    role: z.enum(["admin", "subAdmin", "staff", "client"]),

    status: z.enum(["active", "inactive"]).default("active"),

    password: z.string().min(5, "Password must be at least 5 characters"),

    roleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  }),

  adminLogin: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters"),
  }),

  verifyOtp: z.object({
    email: z.string().email("Invalid email address"),

    otp: z
      .string()
      .length(5, "OTP must be exactly 5 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
  }),

  changePassword: z
    .object({
      email: z.string().email("Invalid email address"),
      newPassword: z.string().min(5, "Password must be at least 5 characters"),
      confirmPassword: z
        .string()
        .min(5, "Password must be at least 5 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
};
