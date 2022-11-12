var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');

app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("11111"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(flash());

app.get("/", (req, res) => {
    var nomeError   = req.flash("nomeError");
    var emailError  = req.flash("emailError");
    var pontosError = req.flash("pontosError"); 
    var email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0 ) ? undefined : emailError;
    email = (email == undefined || email.length == 0)  ? "" : email;

    res.render("index",{emailError,pontosError,nomeError, email:email});
    
    /*console.log("App is running");
    res.send("Running")*/
})

app.post("/form", (req, res) => {
    var {email, nome, pontos} = req.body;
    
    var nomeError;
    var emailError;
    var pontosError;


    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio";
    }
       
    if (nome == undefined || nome == ""){
        nomeError = "O  nome não pode ser vazio";
    }

    if (pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos";
    }

    if (nome.length < 4 ){
        nomeError = "O nome é muito pequeno"
    }

    if (emailError != undefined || pontosError !== undefined || nomeError != undefined){
        req.flash("emailError",emailError);
        req.flash("pontosError",pontosError);
        req.flash("nomeError",nomeError);

        req.flash("email",email);

        res.redirect("/");
    }else{
        res.send("Form OK");
    }


    //res.send(email);
})

app.listen(5678,(req, res) =>{
    console.log("Server is running");
})