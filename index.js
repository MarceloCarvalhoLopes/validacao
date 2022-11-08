var express = require("express");
var app = express();
var session = require('express-session')
var bodyParser = require('body-parser')
var flash = require('express-flash')


app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(flash());

app.get("/", (req, res) => {
    console.log("App is running");
    res.send("Running")
})

app.listen(5678,(req, res) =>{
    console.log("Server is running");
})