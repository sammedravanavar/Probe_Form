(function(){
    'use strict';

    var request = new XMLHttpRequest()

    request.open('GET', '/v1/apis/getEmployeeDetails', true)
    request.onload = function(){
        var data = JSON.parse(this.response)
        if(request.status >= 200 && request.status < 400){
            console.log(data)
        }
        else {
            console.log('error')
        }
    }
    request.send();
    
    request.open('POST', '/v1/apis/editEmployee', true)
    request.onload = function(){
        var data = JSON.parse(this.response)
        if(request.status >= 200 && request.status < 400){
            console.log(data)
        }
        else {
            console.log('error')
        }
    }
    request.send("name=sammed");

    var reviewUsers = document.getElementById('reviewUsers');
    reviewUsers.onclick = function(){
        window.location.href = '/super_admin/reviewUsers'
    }
    var viewUsers = document.getElementById('viewUsers');
    viewUsers.onclick = function(){
        window.location.href = '/super_admin/viewUsers'
    }
    var reviewQuestions = document.getElementById('reviewQuestions');
    reviewQuestions.onclick = function(){
        window.location.href = '/super_admin/reviewQuestions'
    }
    var addUsers = document.getElementById('addUsers');
    addUsers.onclick = function(){
    
    }
    var createRoles = document.getElementById('createRoles');
    createRoles.onclick = function(){
        
    }
    var addQuestions = document.getElementById('addQuestions');
    addQuestions.onclick = function(){

    }
})()