(function(){
    'use strict';
    // var request = new XMLHttpRequest()
    var call = function(method,endpoint,callback){
        var request = new XMLHttpRequest()
        request.open(method, '/v1/apis/'+endpoint, true)
        request.onload = function(){
            var data = JSON.parse(this.response)
            if(request.status >= 200 && request.status < 400){
                console.log(data)
                callback();
            }
            else {
                console.log('error')
            }
        }
        request.send();
    }
    call('GET','getEmployeeDetails',function(){});
    // call('POST','editEmployee',function(){});
    // call('POST','add_users',function(){});
    // call('POST','review_users',function(){});
    // call('POST','create_role',function(){});
    // call('POST','add_questions',function(){});
    // call('POST','review_questions',function(){});

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