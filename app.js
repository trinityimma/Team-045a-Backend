
var express = require("express"),
app = express(),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local");


app.get("/", (req, res)=>{
res.send("This will be the home page!");
})


app.listen(3000, () => {
console.log("Server is running");
});