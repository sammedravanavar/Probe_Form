var mysql = require('mysql')
exports.connectDB = function(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql12345",
        database: "probe_form"
    })
    con.connect(function(err){
        if(err) console.log(err);
        console.log("successfully connected to database "+con);
    })
    return con;
}