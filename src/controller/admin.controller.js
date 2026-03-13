import { logger } from "../helper/logger.js";
import adminService from "../service/admin.service.js";

export default {

    // ============auth============
  createsubAdmin: async (req, res) => {
    try {
      await adminService.createSubadmin(req.body);

      res.status(201).json({
        success: true,
        message: "Subadmin created successfully",
      });
    } catch (error) {
      logger.error(`Error creating subadmin: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Failed to create subadmin",
        error: error.message,
      });
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { data, token } = await adminService.loginAdmin(req.body);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        data,
        token,
      });
    } catch (error) {
      logger.error(`Error while login: ${error.message}`);
      if(error instanceof Error){
        return res.status(400).json({
            success: false,
            message: error.message,
        })
      }
      res.status(500).json({
        success: false,
        message: "Failed to login admin"
       
      });
    }
  },

  sendPasswordOTP: async (req, res) => {

    try {
        if(!req.body.email){
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

      const otp = await adminService.forgetPassword(req.body);

      res.status(200).json({
        success: true,
        message: "Login successfully",
        data: otp,

      });
    } catch (error) {
      logger.error(`Error while login: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Failed to login admin",
        error: error.message,
      });
    }
  },

  verifyOtp: async (req, res) => {

    try {
       
       await adminService.verifyOtp(req.body)

      res.status(200).json({
        success: true,
        message: "Otp veriy successfully",
      });
    } catch (error) {
      logger.error(`Error while verify: ${error.message}`);
      if(error instanceof Error){
        return res.status(400).json({
            success: false,
            message: error.message
        })
      }
      res.status(500).json({
        success: false,
        message: "Failed to verify otp"
      });
    }
  },

  forgotPassword: async (req, res) => {

    try {
       
       await adminService.forgotPassword(req.body)

      res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      logger.error(`Error while change password: ${error.message}`);
      if(error instanceof Error){
        return res.status(400).json({
            success: false,
            message: error.message
        })
      }
      res.status(500).json({
        success: false,
        message: "Failed to change password"
      });
    }
  },

  // ===========subadmin==========
  createRole: async (req, res) => {
    try {
      await adminService.createRoleService(req.body);

      res.status(201).json({
        success: true,
        message: "Role created successfully",
      });
    } catch (error) {
      logger.error(`Error creating role: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Failed to create role",
        error: error.message,
      });
    }
  },
};
