import nodemailer from 'nodemailer';
import config from '../config/config';

export const sendEmail = async (option: {
  email: string | undefined;
  subject: string;
  message: string;
}) => {
  const transport = nodemailer.createTransport({
    host: config.email.host,
    port: parseInt(config.email.port as string),
    auth: {
      user: config.email.auth?.user,
      pass: config.email.auth?.pass,
    },
  });
  const mailOptions = {
    from: 'Boxer-Connect <danrees8743@gmail.com>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transport.sendMail(mailOptions);
};

export default sendEmail;
