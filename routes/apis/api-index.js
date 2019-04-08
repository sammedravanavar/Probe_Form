var express = require('express');
var app = express();

app.use('/login', require('./loginApi'));
app.use('/logout', require('./logoutApi'));
app.use('/getEmployeeDetails', require('./getEmployee'));
app.use('/editEmployee', require('./editEmployee'));
app.use('/editPassword', require('./editPassword'));
app.use('/add_questions', require('./addQuestion'));
app.use('/add_users',require('./addUser'));
app.use('/changeQuestionStatus',require('./changeQuestionStatus'));
app.use('/create_role',require('./createRole'));
app.use('/review_questions',require('./reviewQuestions'));
app.use('/review_users',require('./reviewUser'));
app.use('/getPermissions',require('./getPermissions'));
app.use('/getAllPermissions',require('./getAllPermissions'));
app.use('/getAllTypes',require('./getAllTypes'));
module.exports = app;
