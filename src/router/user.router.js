import express from "express";
import  userController  from "../controller/user.controller.js";
import { validateSchema } from "../zod/validateSchema.js";
import userZodSchema from "../zod/zodSchema/User.zod.js";
const router = express.Router();

router.get("/test", userController.testUser);
// ===================auth===============
router.post("/register",validateSchema(userZodSchema.userSchema), userController.registerUser);
router.post("/send-register-otp",  userController.sendRegisterOTP);
router.post("/verify-register-otp",validateSchema(userZodSchema.verifyOtpSchema),userController.verifyRegisterOtp);
router.post("/login", validateSchema(userZodSchema.loginSchema),userController.loginUser);
router.post("/send-forgot-otp",userController.sendPasswordOTP);
router.post("/verify-forgot-otp",validateSchema(userZodSchema.verifyOtpSchema),userController.verifyPasswordOtp);
router.post("/forgot-password",validateSchema(userZodSchema.forgotPasswordSchema),userController.forgotPassword);


router.get("/search", userController.searchFlights);


export default router;