const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.G_HOST,
  service: process.env.G_SERVICE,
  port: Number(process.env.G_EMAIL_PORT),
  secure: Boolean(process.env.G_SECURE),
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const templatePath = path.join(__dirname, '../templates/verification-email.ejs');
    const html = await ejs.renderFile(templatePath, {
      verificationLink,
      appName: process.env.APP_NAME || 'Our Service'
    });

    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.G_USER}>`,
      to: email,
      subject: 'Verify Your Email',
      html: html,
    });

    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = { sendVerificationEmail };