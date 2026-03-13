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
   purpose: {
    type: String,
    enum: ["register", "forgot_password"]
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

OtpSchema.index({ email: 1, purpose: 1 });

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;