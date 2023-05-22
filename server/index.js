const { config } = require("dotenv");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const conn = mongoose.connection; 
const app = express();
//middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyparser.json())
app.use(express.json())

app.use("/api/login", require("./Routes/login.js"));
app.use("/api/register",require("./Routes/Register.js"));
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))});
mongoose
    .connect(process.env.DB, {useNewUrlParser:true})
    .then(console.log("Successfully connected to mongoDB"))
    .catch(console.log)
conn.on("connected",()=> console.log("DB Connected"));
conn.on("disconnected",()=> console.log("DB disconnected"));
conn.on("error", ()=>console.log("err"))

app.listen(process.env.PORT, (err)=>{
    if (err) console.log(err);
    console.log(`A server is runing at ${process.env.PORT}`)

});

