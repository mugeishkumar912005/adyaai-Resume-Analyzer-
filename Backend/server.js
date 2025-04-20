const express = require("express");
const app = express();
const cors=require('cors')
const UserRoutes  = require('../Backend/Routes/UserRoutes.js');
const Resumeroute=require("../Backend/Routes/Resumeroute.js");
const {DbConnection}=require('../Backend/Dbconfig.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));
app.set("view engine","ejs");
app.use("/api/user", UserRoutes);
app.use("/api/uploads",Resumeroute);
DbConnection
app.listen(6200, () => {
    console.log("Server is running on port 6200");
});

