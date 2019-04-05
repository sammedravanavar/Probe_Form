(function(){
    'use strict';
    var request = new XMLHttpRequest()
    var call = function(method,endpoint,callback,body){
        var request = new XMLHttpRequest()
        request.open(method, '/v1/apis/'+endpoint, true)
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function(){
            console.log(typeof this.response)
            console.log(this.response)
            var data = JSON.parse(this.response)
            if(request.status >= 200 && request.status < 400){
                // console.log(data)
                callback(data);
            }
            else {
                console.log('error')
            }
        }
        request.send(body);
    }
    call('GET','getPermissions',function(data){
        console.log(data);
        var permissions = [];
        data.forEach(object=>{
            permissions.push(object.permission)
        })
        console.log(permissions)
        var row = document.getElementById('cards');
        for(var i=0; i<permissions.length; i++){
            var colDiv = document.createElement('div');
            colDiv.className = "col s12 m6 xl6";
            var cardDiv = document.createElement('div');
            cardDiv.className = "card";
            var cardContent = document.createElement('div');
            cardContent.className="card-content";
            var span = document.createElement('span');
            span.className = "card-title center-align";
            span.innerHTML = permissions[i];
            row.appendChild(colDiv);
            colDiv.appendChild(cardDiv);
            cardDiv.appendChild(cardContent);
            cardContent.appendChild(span);
        }
        var reviewUsers = document.getElementById('review_users');
        reviewUsers.onclick = function(){
            window.location.href = '/super_admin/reviewUsers'
        }
        // var viewUsers = document.getElementById('viewUsers');
        // viewUsers.onclick = function(){
        //     window.location.href = '/super_admin/viewUsers'
        // }
        var reviewQuestions = document.getElementById('review_questions');
        reviewQuestions.onclick = function(){
            window.location.href = '/super_admin/reviewQuestions'
        }
        // var addUsers = document.getElementById('add_users');
        // addUsers.onclick = function(){
        
        // }
        // var createRoles = document.getElementById('create_role');
        // createRoles.onclick = function(){
            
        // }
        // var addQuestions = document.getElementById('add_questions');
        // addQuestions.onclick = function(){
    
        // }
    });
    call('GET','getEmployeeDetails',function(data){});
    //call('POST','editEmployee',function(data){console.log(data)});
    // call('POST','editPassword',function(data){console.log(data)});
    //call('POST','add_users',function(){data});
    // call('POST','review_users',function(data){
    //     console.log(data)
    // });
    //call('POST','changeQuestionStatus',function(data){console.log(data)});
    // "role=hero&permission=['add_user','create_role']"
    //  call('POST','create_role',function(data){console.log(data)}, JSON.stringify({'role':'hero','permissions':[1,2]}));
    //call('POST','add_questions',function(){data});
    // call('POST','review_questions',function(data){
    //     console.log(data)
    // });
})()