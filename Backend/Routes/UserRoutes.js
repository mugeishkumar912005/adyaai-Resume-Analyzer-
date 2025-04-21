const express=require('express')

const {AddUser, Login, GetData, updateData}=require('../Controllers/UserController.js');

const userAuth=require('../Middleware/Auth.js');
const { Resetapi, ResetMailTrigger } = require('../Controllers/FogetPassworHandler.js');

const Route=express.Router();

Route.post('/AddUser',AddUser);
Route.post('/Login',Login);
Route.get('/GetData',userAuth,GetData);
Route.patch('/Update',userAuth,updateData);
Route.patch('/Reset-Password',Resetapi);
Route.post('/Trigger',ResetMailTrigger);
module.exports=Route;