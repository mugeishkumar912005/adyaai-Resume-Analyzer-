const nodemailer = require('nodemailer');
const User = require("../Models/UserModel.js");
const bcrypt=require('bcrypt')
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"mugeishkumar.2005@gmail.com",
        pass:"zdhb rzzy cikb xqkw",
    },
    tls:{
        rejectUnauthorized:false,
    },
    port:587,
    host:"smtp.gmail.service",
    secure:false
})

  const SendReset_Link = async (email) => {
    const mailOptions = {
      from: "mugeishkumar.2005@gmail.com",
      to: email,
      subject: "Hey Don't worry Click the below link to Reset your Password",
      text: `Hi ${email},\n\nClick below to reset your password:\nhttp://localhost:5173/Reset-Password\n\nKeep this link confidential.`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
const ResetMailTrigger = async (req, res) => {
  const { Email } = req.body;

  const existingUser = await User.findOne({ Email });

  if (!existingUser) return res.status(404).json({ Msg: "User Not Found" });

  SendReset_Link(Email);

  res.status(200).json({ Msg: "Mail Sent" });
};

const Resetapi = async (req, res) => {
  try {
    const { Email,NewPass} = req.body;
    console.log('Reset request received:', Email);

    if (!Email || !NewPass) {
      return res.status(400).json({ Msg: "Email and new password are required" });
    }

    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ Msg: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(NewPass, 10);
    user.Password = hashedPassword;

    await user.save();
    console.log('Password updated successfully'); 
    res.status(200).json({ Msg: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};


module.exports={Resetapi,ResetMailTrigger};