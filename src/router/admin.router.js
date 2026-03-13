import express from "express";
import  adminController  from "../controller/admin.controller.js";
import { validateSchema } from "../zod/validateSchema.js";
import adminZodSchema from "../zod/zodSchema/Admin.zod.js";
const router = express.Router();

// ===============auth===============
router.post("/register", validateSchema(adminZodSchema.adminCreate), adminController.createsubAdmin);
router.post("/login", validateSchema(adminZodSchema.adminLogin), adminController.loginAdmin);
router.post("/send-forgot-otp",  adminController.sendPasswordOTP);
router.post("/verify-otp",validateSchema(adminZodSchema.verifyOtp),adminController.verifyOtp);
router.post("/forgot-password",validateSchema(adminZodSchema.changePassword),adminController.forgotPassword);
router.post("/role", adminController.createRole);




export default router;