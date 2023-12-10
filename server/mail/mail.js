import nodemailer from "nodemailer";
import dotnev from "dotenv";

dotnev.config();
//new
let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  host: "smtp.etheral.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user, //process.env.MAIL_EMAIL
    pass: testAccount.pass,//process.env.MAIL_SECRET,
  },
});

export const sendMail = (details, callback) => {
  transporter.sendMail(
    {
      from: `Rythmup <${testAccount.user}>`,
      ...details,
    },
    (err, done) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, done);
      }
    }
  );
};
