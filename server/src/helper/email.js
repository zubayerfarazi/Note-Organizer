const nodemailer = require("nodemailer");
const { smtpUser, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

const sendEmailWithNodemailer = async (emailData) => {
  const { email, subject, html } = emailData;
  try {
    const mailOptions = {
      from: `"Note Organizer" <${smtpUser}>`,
      to: email,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return {success: true, messageId: info.messageId}
  } catch (error) {
    console.error("SMTP Response error: ", error);
  }
};

module.exports = sendEmailWithNodemailer;