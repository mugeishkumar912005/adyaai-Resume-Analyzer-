const nodemailer = require('nodemailer');
const User = require("../Models/UserModel.js");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"mugeishkumar.2005@gmail.com",
    pass:"zdhb rzzy cikb xqkw",
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 587,
  host: 'smtp.gmail.com',
  secure: false,
});

const sendWelcomeEmail = (email,name) => {
  const mailOptions = {
    from: "mugeishkumar.2005@gmail.com",
    to: email,
    subject: `Welcome to Smart Resume Mr/Ms. ${username}`,
    text: 'Build 🏗️ and Enhance your career 📈 by analyzing your Resume with Smart Resume😊✅',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const AddUser = async (req, res) => {
  try {
    const { username, Email, Password, Confirm_Password } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({
        Msg: "Email already exists.",
      });
    }

    if (Password !== Confirm_Password) {
      return res.status(400).json({
        Msg: "Passwords do not match.",
      });
    }

    const Hashed_Password = await bcrypt.hash(Password, 10);
    const New_user = new User({
      username,
      Email,
      Password: Hashed_Password,
    });

    await New_user.save();

    sendWelcomeEmail(Email,username);

    res.status(201).json({
      Msg: "Successfully Stored",
      Data: New_user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};

const GetData = async (req, res) => {
  try {
    const Email = req.user?.Email;

    if (!Email) {
      return res.status(401).json({
        Msg: "Unauthorized",
      });
    }

    const Data = await User.findOne({ Email });

    res.status(200).json({
      Msg: "User found",
      Data: Data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};

const updateData = async (req, res) => {
  try {
    const Ex_Email = req.user?.Email;

    if (!Ex_Email) {
      return res.status(403).json({
        Msg: "User is Unauthorized to access this feature",
      });
    }

    const { username, Email } = req.body;
    const result = await User.updateOne(
      { Email: Ex_Email },
      { $set: { username, Email } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        Msg: "No updates were made. User may not exist or data is the same.",
      });
    }

    res.status(200).json({
      Msg: "Successfully Updated",
      Data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const Find_User = await User.findOne({ Email });

    if (!Find_User) {
      return res.status(403).json({
        Msg: "Bad Authentication. User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(Password, Find_User.Password);

    if (!isMatch) {
      return res.status(401).json({
        Msg: "Invalid Credentials",
      });
    }

    const token = JWT.sign({ Email }, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    });

    if (!token) {
      return res.json({
        Msg: "Token Generation Failed",
      });
    }

    res.status(200).json({
      Msg: "Login Successful",
      Data: Find_User,
      Token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = { AddUser, Login, GetData, updateData };
