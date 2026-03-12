import express from "express";
import  adminController  from "../controller/admin.controller.js";
import { validateSchema } from "../zod/validateSchema.js";
import adminZodSchema from "../zod/zodSchema/Admin.zod.js";
const router = express.Router();

router.post("/register", validateSchema(adminZodSchema.adminCreate), adminController.createsubAdmin);
router.post("/login", validateSchema(adminZodSchema.adminLogin), adminController.loginAdmin);
router.post("/forget",  adminController.forgetPassword);
router.post("/verify-otp",validateSchema(adminZodSchema.verifyOtp),adminController.verifyOtp);
router.post("/change-password",validateSchema(adminZodSchema.changePassword),adminController.changePassword);
router.post("/role", adminController.createRole);

export default router;