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
    res.render("index");
    
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
        res.redirect("/");
    }else{
        res.send("Form OK");
    }


    //res.send(email);
})

app.listen(5678,(req, res) =>{
    console.log("Server is running");
})