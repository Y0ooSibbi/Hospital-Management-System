const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const sendMail = require("./routes/sendMail");
const { requireAdminAuth } = require("./middlewares/adminAuthMiddleware");
const app = express();
const cors = require("cors");
app.use(cors());

dotenv.config();

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE || "";
const port = process.env.PORT || 5000;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log("connected to db and listening at port 5000");
  })
  .catch((err) => {
    app.listen(port);
    app.get("/", (req, res) => {
      res.send(
        "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
        );
      });
    });
    // app.get("/", (req, res) => res.send("server listening at 5000 port!"));
    const apiPath = '/api/v1';
    app.use(apiPath,authRoutes);
    app.use(apiPath,registerRoute);
    app.use(apiPath,doctorRoute);
    app.use(apiPath,patientRoutes);
    app.use(apiPath,adminRoutes);
    app.use(apiPath,logoutRoute);
    app.use(apiPath,sendMail);
    // console.log('hello');
    if (process.env.NODE_ENV == "production") {
      console.log('hello');
      app.use(express.static("client/build"));
      const path = require("path");
      app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }