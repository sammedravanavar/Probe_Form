var express = require('express');
// var session = require('express-session');
var app = express();
var path = require('path')

// app.use(session({
//     secret: 'ssshhhhh',
//     resave: true,
//     saveUninitialized: false
// }));

app.get('/', function(req, res, next) {
    if(req.session.email){
        console.log(req.session.type)
        if(req.session.type === 'super_admin')
            // res.redirect("/super_admin")
            res.sendFile('index.html',{
                root:path.join(__dirname,'../views/super_admin')
            });
        if(req.session.type === 'hr')
            res.sendFile('index.html',{
                root:path.join(__dirname,'../views/super_admin')
            });
            // res.redirect("/hr")
        if(req.session.type === 'interviewer')
            res.sendFile('index.html',{
                root:path.join(__dirname,'../views/super_admin')
            });
            // res.redirect("/interviewer")
        // res.redirect("/candidate");
    }else{
        if(!req.query.error){
            res.sendFile('login.html',{
                root:path.join(__dirname,'../views')
            });
            // res.render('login', { title: 'Express', type:"login" });
        }else{
            // res.render('login', { title: 'Express', type:"loginError", message:req.query.error });
        }
    }
});

module.exports = app;
