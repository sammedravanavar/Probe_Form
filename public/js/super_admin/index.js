(function(){
    'use strict';
    var request = new XMLHttpRequest()
    var call = function(method,endpoint,callback,body){
        var request = new XMLHttpRequest()
        request.open(method, '/v1/apis/'+endpoint, true)
        request.onload = function(){
            var data = JSON.parse(this.response)
            if(request.status >= 200 && request.status < 400){callback(data);}
            else {console.log('error')}
        }
        if(method=='POST'){
            request.setRequestHeader("Content-type", "application/json");
            request.send(body);
        }
        else{
            request.send();
        }
    }
    call('GET','getPermissions',function(data){
        var permissions = [];
        data.forEach(object=>{
            permissions.push(object.permission)
        })
        var row = document.getElementById('cards');
        for(var i=0; i<permissions.length; i++){
            var colDiv = document.createElement('div');
            colDiv.className = "col s12 m6 xl6";
            colDiv.id = permissions[i];
            var cardDiv = document.createElement('div');
            cardDiv.className = "card";
            var cardContent = document.createElement('div');
            cardContent.className="card-content";
            var span = document.createElement('span');
            span.className = "card-title center-align";
            span.innerHTML = formatString(permissions[i]);
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
        
        var createModal = function(){
            var modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = "block";
            var modalContent = document.createElement('div');
            modalContent.className = "modal-content";
            modalContent.id = "modalContent"
            var modalHeader = document.createElement('div');
            modalHeader.className = "modal-header";
            modalHeader.id = "modalHeader";
            var close = document.createElement('span');
            close.className = 'close';
            close.innerHTML = '&times';
            document.body.appendChild(modal);
            modal.appendChild(modalContent);
            modalContent.appendChild(modalHeader);
            modalHeader.appendChild(close);
            close.onclick = function() {
                // modal.style.display = "none";
                document.body.removeChild(modal)
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    // modal.style.display = "none";
                    document.body.removeChild(modal)
                }
            }
        }
        
        var addUsers = document.getElementById('add_users');
        addUsers.onclick = function(){
            createModal();
            var modalContent = document.getElementById('modalContent');
            var modalHeader = document.getElementById('modalHeader');
            modalHeader.innerHTML = "<h5>Add New User</h5>"
            var form = document.createElement('form');
            var sapientId = document.createElement('input');
            sapientId.type = 'text'; sapientId.placeholder = "Sapient ID"
            var name = document.createElement('input');
            name.type = 'text'; name.placeholder = "Name";
            var email = document.createElement('input');
            email.type = 'email'; email.placeholder = "Email";
            var password = document.createElement('input');
            password.type = 'text'; password.placeholder = "Password";
            var type = document.createElement('input');
            type.type = 'text'; type.placeholder = "Type";
            var designation = document.createElement('input');
            designation.type = 'text'; designation.placeholder = "Designation";
            var submit = document.createElement('a');
            submit.innerHTML = 'Submit';
            form.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + type.outerHTML + designation.outerHTML + submit.outerHTML;
            modalContent.appendChild(form);
            submit.onclick = function(){
                call('POST','add_users',function(data){
                    console.log(data)
                },{'name':name.value,'email':email.value,'password':password.value,'type':type.value,'designation':designation.value})       
                document.body.removeChild(modalContent.parentElement)
            }
        }
        // var createRoles = document.getElementById('create_role');
        // createRoles.onclick = function(){
            
        // }
        // var addQuestions = document.getElementById('add_questions');
        // addQuestions.onclick = function(){
    
        // }
    });

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var designation = document.getElementById('designation');
    var cancel = document.getElementById('cancel');
    var submit = document.getElementById('submit');
    var editProfile = document.getElementById('editProfile');
    var changePassword = document.getElementById('changePassword');
    var type = document.getElementById('type');
    
    var formatString = function(string){
        return  string.replace('_',' ').split(' ').map(
                    (s) => s.charAt(0).toUpperCase() + s.substring(1)
                ).join(' ');
    }
    var setDefault = function(){
        cancel.style.display= 'none';
        submit.style.display= 'none';
        editProfile.style.display= '';
        changePassword.style.display= '';
        name.disabled = true;
        email.disabled = true;
        designation.disabled = true;
    }
    setDefault();

    call('GET','getEmployeeDetails',function(data){
        var profile=document.getElementById('profile');
        name.value = (data.name).charAt(0).toUpperCase()+(data.name).slice(1);
        email.value = data.email;
        designation.value = data.designation;
        type.innerHTML = formatString(data.type)
    });
  
    editProfile.onclick = function(){
        var currentName = name.value;
        var currentEmail = email.value;
        var currentDesgnation = designation.value;
        cancel.style.display = '';
        submit.style.display= '';
        editProfile.style.display= 'none';
        changePassword.style.display= 'none';
        name.disabled = false;
        email.disabled = false;
        designation.disabled = false;
        cancel.onclick = function(){
            setDefault();
            name.value = currentName;
            email.value = currentEmail;
            designation.value = currentDesgnation;
        }
        submit.onclick = function(){
            setDefault();
            var newName = name.value;
            var newEmail = email.value;
            var newDesgnation = designation.value;
            call('POST','editEmployee',function(data){console.log(data)}, JSON.stringify({'name':newName,'email':newEmail,'designation':newDesgnation}));
        }
    }
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