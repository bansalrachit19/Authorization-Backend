const express = require("express");
const app = express();

require("dotenv").config;
const PORT = process.env.PORT || 4000; 

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

const dbConnect = require("../AuthApp/config/dbConnect");
dbConnect();

const users = require("../AuthApp/routes/users");
app.use("/api/v1", users);

app.listen(PORT, () => {
    console.log(`server started at ${PORT} succesfully`);
})