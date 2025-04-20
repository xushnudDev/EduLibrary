import { config } from "dotenv";
import transporter from "../src/config/mail.config.js";
import { BaseException } from "../exceptions/base.exception.js";
config();



export const sendMail = async ({ to, subject, text = "", html = "" }) => {
    try {
      const mail = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
        html,
      });
  
      return mail.messageId;
    } catch (error) {
      throw new BaseException("Email yuborishda xatolik!");
    }
};