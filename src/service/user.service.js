import User from "../Models/User.model.js";
import Otp from "../Models/Otp.model.js";
import { sendOtpEmail } from "../helper/sendEmail.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helper/token.js";


export default {
  testUser: async () => {
    return "User route is working fine";
  },

  sendRegisterOTP: async (data) => {
    const otp = Math.floor(10000 + Math.random() * 90000);
    const otpData = {
      email: data.email,
      otp: otp,
      purpose: "register",
    };

    const userEmail = await Otp.findOne({
      email: data.email,
      purpose: "register",
    });
    if (userEmail) {
      userEmail.otp = otp;
      userEmail.isVerify = false;
      userEmail.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await userEmail.save();
      await sendOtpEmail(data.email, otp, "register");
      return otp;
    }

    const otpModel = new Otp(otpData);
    await otpModel.save();
    await sendOtpEmail(data.email, otp, "register");
    return otp;
  },

  verifyRegisterOtp: async (data) => {
    const otpData = await Otp.findOne({
      email: data.email,
      purpose: "register",
    });
    if (!otpData) {
      throw new Error("invalid otp ! resend again");
    }

    if (data.otp !== otpData.otp) {
      throw new Error("invalid otp");
    }
    otpData.isVerify = true;
    await otpData.save();
    return true;
  },

  registerUser: async (userData) => {
    const isVerifyRegisterOtp = await Otp.findOne({
      email: userData.email,
      purpose: "register",
      isVerify: true,
    });
    if (!isVerifyRegisterOtp) {
      throw new Error("please verify otp");
    }

    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  },

  loginUser: async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Email or password");
    }
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = generateToken(payload);

const userObj = user.toObject();
delete userObj.password;
    return {
      data: userObj,
      token,
    };
  },

  sendPasswordOTP: async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("If the email is registered, please check your inbox for the OTP.");
    }
    const otp = Math.floor(10000 + Math.random() * 90000);
    const otpData = {
      email: data.email,
      otp: otp,
      purpose: "forgot_password",
    };

    const userEmail = await Otp.findOne({
      email: data.email,
      purpose: "forgot_password",
    });
    if (userEmail) {
      userEmail.otp = otp;
      userEmail.isVerify = false;
      userEmail.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await userEmail.save();
      await sendOtpEmail(data.email, otp, "forgot_password");
      return otp;
    }

    const otpModel = new Otp(otpData);
    await otpModel.save();
    await sendOtpEmail(data.email, otp, "forgot_password");
    return otp;
  },

  verifyPasswordOtp: async (data) => {
    const otpData = await Otp.findOne({
      email: data.email,
      purpose: "forgot_password",
    });
    if (!otpData) {
      throw new Error("invalid otp ! resend again");
    }

    if (data.otp !== otpData.otp) {
      throw new Error("invalid otp");
    }
    otpData.isVerify = true;
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
      const user=await User.findOne({email:data.email});
      if(!user){
        throw new Error("user not found");
      }
      
      user.password=data.newPassword;
      await user.save();
    },
};
