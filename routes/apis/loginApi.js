var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser")
var app = express();
var router = express.Router();
var mysql = require("./mySqlCalls.js");
var qs=require("querystring");


app.use(session({
    secret: 'ssshhhhh',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)

app.post('/', function(req, res, next) {
    // console.log(req.body);
    var email = req.body.email;
    var pass = req.body.pass;

    var callback = function(err, result){
        if(err){
            console.log(err.message);
            res.redirect("/login?error="+qs.escape(err.message));
            //res.render('login', { title: 'Express', type:"loginError", message:"Something went wrong." });
        }
        if(result.length==0){
            // console.log("Cannot find user");
            res.redirect("/login?error="+qs.escape("Please check your username and password"));
            // res.render('login', { title: 'Express', type:"loginError", message:"Please check your username and password" });
        }else{
            var employee=result[0];
            if(employee["type"]){
                console.log('ji')
                req.session.id = employee["sapientId"]
                req.session.email = employee["email"];
                req.session.type = employee["type"];
                if(req.session.type === "super_admin"){
                    res.redirect("/super_admin/");
                } 
                else if(req.session.type === "hr"){
                    res.redirect("/hr?id=" + employee["sapientId"]);
                }
                else if(req.session.type === "interviewer"){
                    res.redirect("/interviewer?id=" + employee["sapientId"]);
                }
            } else{
                console.log('li')
                // req.session.email=myDet["emailId"];
                // req.session.departmentId = myDet["departmentId"];
                // req.session.facultyId=myDet["facultyId"];
                // if(req.session.facultyId === 'principle'){
                //     req.session.facultyId = 'principal';
                // }
                // res.redirect("/faculty");
            }
        }
    }
    mysql.login(email, pass, callback);
});

module.exports = app;