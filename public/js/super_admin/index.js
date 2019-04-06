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
                document.body.removeChild(modal)
            }
            window.onclick = function(event) {
                if (event.target == modal) {
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
            var sapientId = document.createElement('input');
            sapientId.type = 'text'; sapientId.placeholder = "Sapient ID"; sapientId.id = 'sapientId';
            var name = document.createElement('input'); 
            name.type = 'text'; name.placeholder = "Name"; name.id = 'newName';
            var email = document.createElement('input');
            email.type = 'email'; email.placeholder = "Email"; email.id = 'newEmail';
            var password = document.createElement('input');
            password.type = 'text'; password.placeholder = "Password"; password.id ='newPassword';
            var role = document.createElement('input');
            role.type = 'text'; role.placeholder = "Type"; role.id = 'newRole';
            var designation = document.createElement('input');
            designation.type = 'text'; designation.placeholder = "Designation"; designation.id = 'newDesignation';
            var submitForm = document.createElement('button');
            submitForm.id = "submitUser";
            submitForm.innerHTML = 'Submit';
            modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + role.outerHTML + designation.outerHTML + submitForm.outerHTML;
            document.getElementById("submitUser").onclick = function(){
                var sapientId = document.getElementById('sapientId').value;
                var name = document.getElementById('newName').value;
                var email = document.getElementById('newEmail').value;
                var password = document.getElementById('newPassword').value;
                var role = document.getElementById('newRole').value;                
                var designation = document.getElementById('newDesignation').value;
                call('POST','add_users',function(data){
                    console.log(data)
                },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':role,'designation':designation}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
        var createRoles = document.getElementById('create_role');
        createRoles.onclick = function(){
            call('GET','getAllPermissions',function(data){
                var permissions = data;
                var permissionList = [];
                var permissionJson = {};
                createModal();
                var modalContent = document.getElementById('modalContent');
                var modalHeader = document.getElementById('modalHeader');
                modalHeader.innerHTML = "<h5>Create New Role</h5>"
                var role = document.createElement('input');
                role.type = 'text'; role.placeholder = "Role Name"; role.id="role";
                var container = document.createElement('div'); 
                // container.className = "container";
                container.innerHTML = "<h5>Select Permissions</h5>"
                for(var i=0; i<Object.keys(permissions).length; i++){
                    permissionJson[permissions[i].permission] = permissions[i].id;
                    permissionList.push(permissions[i].permission)
                }
                permissionList.forEach(permission=>{
                    var checckLabel = document.createElement('label');
                    checckLabel.for = permission;
                    var checkElement = document.createElement('input');
                    checkElement.id = permission;
                    checkElement.type = 'checkbox';
                    checkElement.name = 'permissions';
                    checkElement.value = permission;
                    checckLabel.innerHTML += checkElement.outerHTML + formatString(permission);
                    container.innerHTML += checckLabel.outerHTML + '<br/>';
                })
                var submitForm = document.createElement('button');
                submitForm.id = "submitForm";
                submitForm.style.marginTop = '20px';
                submitForm.innerHTML = 'Submit';
                modalContent.innerHTML += role.outerHTML + container.outerHTML + submitForm.outerHTML;
                document.getElementById("submitForm").onclick = function(){
                    var roleName = document.getElementById('role').value
                    var checkedList = document.querySelectorAll('input[name="'+'permissions'+'"]:checked'),values=[];
                    var checkedPermissionsList = [];
                    checkedList.forEach(checked=>{
                        checkedPermissionsList.push(permissionJson[checked.value])
                    })
                    call('POST','create_role',function(data){
                    },JSON.stringify({'role':roleName,'permissions': checkedPermissionsList}))       
                    document.body.removeChild(modalContent.parentElement)
                }
            })
        }
        var addQuestions = document.getElementById('add_questions');
        addQuestions.onclick = function(){
            createModal();
            var modalContent = document.getElementById('modalContent');
            var modalHeader = document.getElementById('modalHeader');
            modalHeader.innerHTML = "<h5>Create New Role</h5>"
            // var role = document.createElement('input');
            // role.type = 'text'; role.placeholder = "Role Name"; role.id="role";
            var text = document.createElement('textarea');
            text.placeholder = "Question"; text.id = "question";
            var op1 = document.createElement('input');
            op1.type = "text"; op1.placeholder = "Option 1"; op1.id = "op1";
            var op2 = document.createElement('input');
            op2.type = "text"; op2.placeholder = "Option 2"; op2.id = "op2";
            var op3 = document.createElement('input');
            op3.type = "text"; op3.placeholder = "Option 3"; op3.id = "op3";
            var op4 = document.createElement('input');
            op4.type = "text"; op4.placeholder = "Option 4"; op4.id = "op4";
            var op5 = document.createElement('input');
            op5.type = "text"; op5.placeholder = "Option 5"; op5.id = "op5";
            var answer = document.createElement('input');
            answer.type = "number"; answer.placeholder = "Option number of correct answer"; answer.id = "answer";
            var levels = [], techs = [], stages=[];
            var difficulty = document.createElement('select');
            ["easy", "medium", "difficult"].forEach(level=>{
                levels[i] = document.createElement('option');
                levels[i].innerHTML = level;
                levels[i].value = level;
                difficulty.innerHTML += levels[i].outerHTML;
            })
            var technology = document.createElement('select');
            ["HTML","CSS","Javascript","JS Libraries/Frameworks","Mobile Web HTML5 Mark-up and APIs","Standards", "Debugging and Optimization","Accessibility"].forEach(tech=>{
                techs[i] = document.createElement('option');
                techs[i].innerHTML = tech;
                techs[i].value = tech;
                technology.innerHTML += techs[i].outerHTML;
            })
            var careerStage = document.createElement('select');
            ["AL1", "AL2", "SAL1", "SAL2"].forEach(cs=>{
                stages[i] = document.createElement('option');
                stages[i].innerHTML = cs;
                stages[i].value = cs;
                careerStage.innerHTML += stages[i].outerHTML;
            })
            var submitForm = document.createElement('button');
            submitForm.id = 'submitQuestion';
            submitForm.innerHTML = 'Submit';
            // submitForm.type = 'submit';
            modalContent.innerHTML += '<br/>' + text.outerHTML + op1.outerHTML + op2.outerHTML + op3.outerHTML + op4.outerHTML + op5.outerHTML + answer.outerHTML + careerStage.outerHTML  + difficulty.outerHTML + technology.outerHTML + '<br/>' + submitForm.outerHTML;
            document.getElementById("submitQuestion").onclick = function(){
                var roleName = document.getElementById('role').value
                call('POST','add_questions',function(data){
                    console.log(data)
                },JSON.stringify({'role':roleName,'permissions': [1]}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
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
            console.log(designation.value);
            var newName = name.value;
            var newEmail = email.value;
            var newDesgnation = designation.value;
            call('POST','editEmployee',function(data){console.log(data)}, JSON.stringify({'name':newName,'email':newEmail,'designation':newDesgnation}));
        }
    }
    // call('POST','editPassword',function(data){console.log(data)});
    // call('POST','review_users',function(data){
    //     console.log(data)
    // });
    //call('POST','changeQuestionStatus',function(data){console.log(data)});
    // "role=hero&permission=['add_user','create_role']"
    // call('POST','review_questions',function(data){
    //     console.log(data)
    // });
})()