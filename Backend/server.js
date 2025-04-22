const express = require("express");
const serverless = require("serverless-http"); 
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRoutes = require('../Backend/Routes/UserRoutes.js');
const Resumeroute = require("../Backend/Routes/Resumeroute.js");
const HistoryRoutes = require("../Backend/Routes/HistoryRoutes.js");
const { DbConnection } = require('../Backend/Dbconfig.js');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: 'https://adyaai-resume-analyzer-front-cwq1z7p9y-mks-projects-534eb461.vercel.app',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));

app.set("view engine", "ejs");

app.use("/api/user", UserRoutes);
app.use("/api/uploads", Resumeroute);
app.use("/api/History", HistoryRoutes);

DbConnection();

module.exports = app;
module.exports.handler = serverless(app);
