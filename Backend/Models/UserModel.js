const mongoose = require('mongoose');

   const UserModel = new mongoose.Schema({
     username: {
       type: String,
       required: true,
     },
     Email: {
       type: String,
       required: true,
       unique: true, 
     },
     Password: {
       type: String,
       required: true,
     }
   }, { timestamps: true });
   
module.exports = mongoose.model("User",UserModel);
