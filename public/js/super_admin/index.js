(function(){
    'use strict';
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