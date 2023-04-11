const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const verificationEmail = {
    to: email,

    subject: "Verification request",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Click here to verify your email</a>`,
    from: "shavaliuk.marta@gmail.com",
  };

  await sgMail.send(verificationEmail);
};

module.exports = { sendEmail };
