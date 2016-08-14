var express = require("express");
var fs = require("fs");
var moment = require("moment");
var bodyParser = require("body-parser");
var jwt = require("jwt-simple");
var auth = require("./jwtauth");

app = express();

var people = [
    {
        name: "Essa",
        age: 22
    },
    {
        name: "Abdullah",
        age: 24
    },
    {
        name: "Farrukh",
        age: 33
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("client"));
app.set("jwtTokenSecret","mytokensecret");

app.set("username","essa"); //example username
app.set("password","pakistan"); //example password

app.get("/api",auth,function(req,res){
    res.json(people);
});

app.post("/login",function(req,res){
    if(req.body.username === app.get("username") && req.body.password === app.get("password")){
        var token = jwt.encode({
            iss: app.get("username"),
            exp: moment().add(7,"days").valueOf()
        }, app.get("jwtTokenSecret"));
        res.end(token)
    }
    else{
        res.status(401);
        res.end("Wrong username/password combination");
    }
});

var server = app.listen("1337",function(err){
    console.log("server running at 1337")
});