import Role from "../Models/Role.model.js";
import Admin from "../Models/Admin.models.js";
import Otp from "../Models/Otp.model.js";
import { generateToken } from "../helper/token.js";
import {sendOtpEmail} from "../helper/sendEmail.js";
import bcrypt from "bcryptjs";


export default {
  createSubadmin: async (data) => {
    const newAdmin = new Admin(data);
    await newAdmin.save();
    return newAdmin;
  },
  loginAdmin: async (data) => {
    const admin = await Admin.findOne({ email: data.email });
    if (!admin) {
      throw new Error("Admin not found");
    }
    const isMatch = await bcrypt.compare(data.password, admin.password);
    if (!isMatch) {
      throw new Error("Invalid Email or password");
    }
    const payload = {
      id: admin._id,
      role: admin.role,
    };
    const token = generateToken(payload);
    return {
        data: admin,
        token,
    };
  },

  sendPasswordOTP: async (data) => {
    const user=await Admin.findOne({email:data.email});
    if(!user){
      throw new Error("If the email is registered, please check your inbox for the OTP.");
    }
    const otp = Math.floor(10000 + Math.random() * 90000);
    const otpData = {
      email: data.email,
      otp: otp,
      purpose: "forgot_password",
    };

    const  userEmail= await Otp.findOne({ email: data.email, purpose: "forgot_password" });
    if(userEmail){

        userEmail.otp=otp;
        userEmail.isVerify=false;
        userEmail.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await userEmail.save();
        await sendOtpEmail(data.email, otp);
        return otp;
    }

    const otpModel = new Otp(otpData);
    await otpModel.save();
    await sendOtpEmail(data.email, otp);
    return otp
  },

  verifyOtp: async (data) => {
    const otpData=await Otp.findOne({email:data.email});
    if(!otpData){
      throw new Error("invalid otp ! resend again");
    }
     
    if(data.otp!==otpData.otp){
      throw new Error("invalid otp");
    }
    otpData.isVerify=true;
    await otpData.save();
    return true;
  },

  forgotPassword: async (data) => {
    const otpData=await Otp.findOne({email:data.email, purpose: "forgot_password"});
    if(!otpData){
      throw new Error("invalid otp or resend otp !");
    }
     
    if(!otpData.isVerify){
         throw new Error("please verify Otp");
    }
    const user=await Admin.findOne({email:data.email});
    if(!user){
      throw new Error("user not found");
    }
    
    user.password=data.newPassword;
    await user.save();
  },

  



   

//   ==========role===========

  createRoleService: async (roleData) => {
    const role = new Role(roleData);
    await role.save();
    return role;
  },
};
