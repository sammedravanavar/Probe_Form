var path = require('path')

var checkSesssion=function(req, res){
    if(!req.session.email){
        // res.redirect("/login");
        res.sendFile('login.html',{
            root:path.join(__dirname,'../views')
        });
        return false;
    }
    return true;
}

var checkGetParam = function(req,res){
    if(req.query.type){
        return true;
    }
    return false;
}

module.exports={
    checkSesssion: checkSesssion,
    checkGetParam: checkGetParam
    }