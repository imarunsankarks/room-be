const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'resurgent.arun@gmail.com',
    pass: process.env.SMTP_PW
  }
});

app.post('/send', (req, res) => {
  const { name,phone, email, company, type, vc, camera, display, touchpad, speaker, micro } = req.body;

  const mailOptions = {
    from: email,
    to: 'resurgent.arun@gmail.com',
    subject: `Message from ${name}`,
    text: `
    Name: ${name}
    Phone: ${phone}
    Email: ${email}
    Company: ${company}
    Type: ${type}
    VC: ${vc}
    Camera: ${camera}
    Display: ${display}
    Touchpad: ${touchpad}
    Speaker: ${speaker}
    Micro: ${micro}
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
