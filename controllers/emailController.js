import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });
  const info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL:%s", nodemailer.getTestMessageUrl(info));
});
