const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRoutes = require('./Routes/UserRoutes.js'); // Paths must match your file structure
const Resumeroute = require("./Routes/Resumeroute.js");
const HistoryRoutes = require("./Routes/HistoryRoutes.js");
const { DbConnection } = require('./Dbconfig.js');

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin:'https://adyaai-resume-analyzer-front.vercel.app/',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
}));

app.set("view engine", "ejs");

app.use("/api/user", UserRoutes);
app.use("/api/uploads", Resumeroute);
app.use("/api/History", HistoryRoutes);

app.get("/api/health", (req, res) => res.send("OK"));

DbConnection;

const PORT = process.env.PORT || 6200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`  );
});
