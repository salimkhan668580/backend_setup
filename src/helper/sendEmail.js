import nodemailer from "nodemailer";
import {logger} from "./logger.js";
import dotenv from 'dotenv'
dotenv.config()




const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user:"dell.wyman@ethereal.email",
    pass:"UknPVFJuXNMsa24BB2",
  },
});

export const sendOtpEmail = async (email, otp, purpose) => {

  const info = await transporter.sendMail({
    from: '"OTP Service" <maddison53@ethereal.email>',
    to: "dock.conn@ethereal.email",
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    html: `<h2>Your OTP is: ${otp}</h2>
           <p>This OTP will expire in 5 minutes.</p>`
  });

 logger.success("Message sent:", info.messageId);

  return info;
};