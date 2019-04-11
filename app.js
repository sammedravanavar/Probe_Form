var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')

var app = express();
app.use(session({ secret: 'RIT Data Center 19089905'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', require('./src/server/routes/login'));
app.use('/login', require('./src/server/routes/login'));
// app.use('/forgotPass', require('./routes/forgotPass'));
app.use('/v1/apis', require('./src/server/routes/apis/api-index'));
app.use('/admin', require('./src/server/routes/admin/index'));

module.exports = app;
