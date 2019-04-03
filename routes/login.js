var express = require('express');
var session = require('express-session');
var app = express();
var router = express.Router();

app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: false
}));
// app.use(router)

app.get('/', function(req, res, next) {
    if(req.session.email){
        if(req.session.type === 'super_admin')
            res.redirect("/super_admin")
        if(req.session.type === 'hr')
            res.redirect("/hr")
        if(req.session.type === 'hr')
            res.redirect("/interviewer")
        res.redirect("/candidate");
    }else{
        if(!req.query.error){
            res.render('login', { title: 'Express', type:"login" });
        }else{
            res.render('login', { title: 'Express', type:"loginError", message:req.query.error });
        }
    }
});

module.exports = app;
