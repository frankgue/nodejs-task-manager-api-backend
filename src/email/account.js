const sgMail = require("@sendgrid/mail");
require("dotenv").config({
  path: ".test.env",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: "frankguekeng@gmail.com",
    from: "frankguekeng11@gmail.com",
    subject: "this is a first message",
    text: "this is a test email",
  });
};
const sendCancellingEmail = (email, name) => {
  sgMail.send({
    to: "frankguekeng@gmail.com",
    from: "frankguekeng11@gmail.com",
    subject: "cancel confimatiton mail",
    text: "this is a deletion account email",
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellingEmail,
};
