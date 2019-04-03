var express = require('express');
var app = express();

app.use('/login', require('./loginApi'));
app.use('/logout', require('./logoutApi'));

module.exports = app;
