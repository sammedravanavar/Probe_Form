var express = require('express');
var app = express();

app.use('/login', require('./loginApi'));
app.use('/logout', require('./logoutApi'));
app.use('/getEmployeeDetails', require('./getEmployee'));
module.exports = app;
