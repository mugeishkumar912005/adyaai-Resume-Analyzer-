const express=require('express')

const {AddUser, Login, GetData, updateData}=require('../Controllers/UserController.js');

const userAuth=require('../Middleware/Auth.js')

const Route=express.Router();

Route.post('/AddUser',AddUser);
Route.post('/Login',Login);
Route.get('/GetData',userAuth,GetData);
Route.patch('/Update',userAuth,updateData);

module.exports=Route;