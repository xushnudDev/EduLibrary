import {config} from 'dotenv';
import nodemailer from 'nodemailer';
config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});
export default transporter;