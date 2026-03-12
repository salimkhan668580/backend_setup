import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  isVerify: {
    type: Boolean,
    default: false,
  },

  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000),
    index: { expires: 0 }
  }

}, { timestamps: true });

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;