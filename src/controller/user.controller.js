import { logger } from "../helper/logger.js";
import userService from "../service/user.service.js";

export default {
  testUser: async (req, res) => {
    try {
      const result = await userService.testUser();
      res.status(200).json({
        success: true,
        message: result,
      });
    } catch (error) {
      logger.error(`Error in testUser: ${error.message}`);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  //   ====================auth===========================
  sendRegisterOTP: async (req, res) => {
    try {
      if (!req.body.email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const otp = await userService.sendRegisterOTP(req.body);

      res.status(200).json({
        success: true,
        message: "Otp sent successfully",
        data: otp,
      });
    } catch (error) {
      logger.error(`Error while sending otp: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to send otp",
      });
    }
  },

  verifyRegisterOtp: async (req, res) => {
    try {
      await userService.verifyRegisterOtp(req.body);

      res.status(200).json({
        success: true,
        message: "Otp veriy successfully",
      });
    } catch (error) {
      logger.error(`Error while verify: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to verify otp",
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      const result = await userService.registerUser(req.body);
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      logger.error(`Error in registerUser: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { data, token } = await userService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        data,
        token,
      });
    } catch (error) {
      logger.error(`Error while login: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to login User",
      });
    }
  },

  sendPasswordOTP: async (req, res) => {
    try {
      if (!req.body.email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const otp = await userService.sendPasswordOTP(req.body);

      res.status(200).json({
        success: true,
        message: "Opt send successfully",
        data: otp,
      });
    } catch (error) {
      logger.error(`Error while send otp: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Failed to send otp",
        error: error.message,
      });
    }
  },

  verifyPasswordOtp: async (req, res) => {
    try {
      await userService.verifyPasswordOtp(req.body);

      res.status(200).json({
        success: true,
        message: "Otp veriy successfully",
      });
    } catch (error) {
      logger.error(`Error while verify: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to verify otp",
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      await userService.forgotPassword(req.body);

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      logger.error(`Error while change password: ${error.message}`);
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to change password",
      });
    }
  },
};
