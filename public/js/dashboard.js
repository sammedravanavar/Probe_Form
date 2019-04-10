(function(){
    'use strict';
    
    //method --> GET/POST, endpoint --> api endpoint
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
    
    var auth;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var designation = document.getElementById('designation');
    var cancel = document.getElementById('cancel');
    var submit = document.getElementById('submit');
    var editProfile = document.getElementById('editProfile');
    var profile=document.getElementById('profile');
    var changePassword = document.getElementById('changePassword');
    var type = document.getElementById('type');
    var errorMessage = document.createElement('label');
    errorMessage.id="err";
    errorMessage.style.color="red";
    
    //genertes a modal layout with header, content and modal close functionality
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
    
    // export {createModal};

    // import {createModal} from './index.js';
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
        name.value = (data.name).charAt(0).toUpperCase()+(data.name).slice(1);
        email.value = data.email;
        designation.value = data.designation;
        type.innerHTML = formatString(data.type)
        auth = data.type;
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
            if(newName.length==0||newEmail.length==0||newDesgnation.length==0){
                profile.appendChild(errorMessage);
                errorMessage.innerHTML="Fill all input fields" + '<br/>';
                name.value = currentName;
                email.value = currentEmail;
                designation.value = currentDesgnation;
            }
            if(!newEmail.match(emailRegex)){
                profile.appendChild(errorMessage);
                errorMessage.innerHTML="Email Format is wrong" + '<br/>';
                name.value = currentName;
                email.value = currentEmail;
                designation.value = currentDesgnation;
            }
            else{
                errorMessage.innerHTML=""
                call('POST','editEmployee',function(data){console.log(data)}, JSON.stringify({'name':newName,'email':newEmail,'designation':newDesgnation}));
            }
            
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
        if(document.getElementById('review_users')){
            var reviewUsers = document.getElementById('review_users');
            reviewUsers.onclick = function(){
                window.location.href = '/admin/reviewUsers'
            }
        }
        if(document.getElementById('review_questions')){
            var reviewQuestions = document.getElementById('review_questions');
            reviewQuestions.onclick = function(){
                window.location.href = '/admin/reviewQuestions'
            }
        }
        if(document.getElementById('add_users')){
            var addUsers = document.getElementById('add_users');
            addUsers.onclick = function(){
                call('GET','getAllTypes',function(data){
                    var roles = [];
                    for(var i=0; i<Object.keys(data).length; i++){
                        roles.push(data[i].type);
                    }
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
                    var roleType = document.createElement('select');
                    roleType.id = 'newRole';
                    var roleOptions = []
                    roles.forEach((role,i)=>{
                        roleOptions[i] = document.createElement('option');
                        roleOptions[i].innerHTML = role;
                        roleOptions[i].value = role;
                        roleType.innerHTML += roleOptions[i].outerHTML;
                    })
                    var designation = document.createElement('select');
                    designation.id = 'careerStage';
                    // designation.type = 'text';  
                    var designations=["AL1", "AL2", "SAL1", "SAL2"]
                    var desigOptions = [];
                    designations.forEach((d,i)=>{
                        desigOptions[i] = document.createElement('option');
                        desigOptions[i].innerHTML = d;
                        desigOptions[i].value = d;
                        designation.innerHTML +=desigOptions[i].outerHTML;
                    })
                    // designation.placeholder = "Designation"; 
                    // designation.id = 'newDesignation';
                    var submitForm = document.createElement('button');
                    submitForm.id = "submitUser";
                    submitForm.innerHTML = 'Submit';
                    submitForm.className="btn";
                    modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + roleType.outerHTML + designation.outerHTML + submitForm.outerHTML + '<br/>';
                    document.getElementById("submitUser").onclick = function(){
                        var sapientId = document.getElementById('sapientId').value;
                        var name = document.getElementById('newName').value;
                        var email = document.getElementById('newEmail').value;
                        var password = document.getElementById('newPassword').value;
                        var role = document.getElementById('newRole').options[document.getElementById('newRole').selectedIndex].value;
                        var careerStage = document.getElementById('careerStage').options[document.getElementById('careerStage').selectedIndex].value;
                        if(sapientId.length==0||name.length==0||email.length==0||password.length==0){
                            modalContent.appendChild(errorMessage);
                            errorMessage.innerHTML="Fill all input fields" + '<br/>';
                        }
                        if(!email.match(emailRegex)){
                            modalContent.appendChild(errorMessage);
                            errorMessage.innerHTML+="Email Format is wrong";
                        }
                        else{
                            call('POST','add_users',function(data){
                                console.log(data)
                            },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':role,'designation':careerStage}))       
                            document.body.removeChild(modalContent.parentElement)
                        }
                    }
                })
            }
        }
        if(document.getElementById('create_role')){
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
                    submitForm.className="btn";
                    submitForm.id = "submitForm";
                    submitForm.style.marginTop = '20px';
                    submitForm.innerHTML = 'Submit';
                    modalContent.innerHTML += role.outerHTML + container.outerHTML + submitForm.outerHTML + '<br/>';
                    document.getElementById("submitForm").onclick = function(){
                        var roleName = document.getElementById('role').value
                        var checkedList = document.querySelectorAll('input[name="'+'permissions'+'"]:checked'),values=[];
                        var checkedPermissionsList = [];
                        checkedList.forEach(checked=>{
                            checkedPermissionsList.push(permissionJson[checked.value])
                        })
                        if(roleName.length==0){
                            modalContent.appendChild(errorMessage);
                            errorMessage.innerHTML="Role Name must be added"+'<br/>';
                        }
                        if(checkedPermissionsList.length==0){
                            modalContent.appendChild(errorMessage);
                            errorMessage.innerHTML+="At least 1 permission must be selected";
                        }
                        else{
                            call('POST','create_role',function(data){
                            },JSON.stringify({'role':roleName,'permissions': checkedPermissionsList}))       
                            document.body.removeChild(modalContent.parentElement)
                        }
                        
                    }
                })
            }
        }
        if(document.getElementById('add_questions')){
            var addQuestions = document.getElementById('add_questions');
            addQuestions.onclick = function(){
                createModal();
                var modalContent = document.getElementById('modalContent');
                var modalHeader = document.getElementById('modalHeader');
                modalHeader.innerHTML = "<h5>Add Question</h5>"
                var text = document.createElement('textarea');
                text.required=true;
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
                answer.min="1";answer.max="5";
                var levels = [], techs = [], stages=[];
                var difficulty = document.createElement('select');
                difficulty.id = 'difficulty';
                ["easy", "medium", "difficult"].forEach((level,i)=>{
                    levels[i] = document.createElement('option');
                    levels[i].innerHTML = level;
                    levels[i].value = level;
                    difficulty.innerHTML += levels[i].outerHTML;
                })
                var technology = document.createElement('select');
                technology.id = 'technology';
                ["HTML","CSS","Javascript","JS Libraries/Frameworks","Mobile Web HTML5 Mark-up and APIs","Standards", "Debugging and Optimization","Accessibility"].forEach((tech,i)=>{
                    techs[i] = document.createElement('option');
                    techs[i].innerHTML = tech;
                    techs[i].value = tech;
                    technology.innerHTML += techs[i].outerHTML;
                })
                var careerStage = document.createElement('select');
                careerStage.id = 'careerStage';
                ["AL1", "AL2", "SAL1", "SAL2"].forEach((cs,i)=>{
                    stages[i] = document.createElement('option');
                    stages[i].innerHTML = cs;
                    stages[i].value = cs;
                    careerStage.innerHTML += stages[i].outerHTML;
                })
                var submitForm = document.createElement('button');
                submitForm.className="btn";
                submitForm.id = 'submitQuestion';
                submitForm.innerHTML = 'Submit';
                // submitForm.type = 'submit';
                modalContent.innerHTML += '<br/>' + text.outerHTML + op1.outerHTML + op2.outerHTML + op3.outerHTML + op4.outerHTML + op5.outerHTML + answer.outerHTML + careerStage.outerHTML  + difficulty.outerHTML + technology.outerHTML + '<br/>' + submitForm.outerHTML + '<br/>';
                document.getElementById("submitQuestion").onclick = function(){
                    var text = document.getElementById('question').value;
                    var op = [];
                    op[0] = document.getElementById('op1').value;
                    op[1] = document.getElementById('op2').value;
                    op[2] = document.getElementById('op3').value;
                    op[3] = document.getElementById('op4').value;
                    op[4] = document.getElementById('op5').value;
                    
                    var answer = op[document.getElementById('answer').value - 1];
                    console.log(answer);
                    var careerStage = document.getElementById('careerStage').options[document.getElementById('careerStage').selectedIndex].value;
                    var difficulty = document.getElementById('difficulty').options[document.getElementById('difficulty').selectedIndex].value;
                    var technology = document.getElementById('technology').options[document.getElementById('technology').selectedIndex].value;
                    if(text.length==0 ||op[0].length==0||op[1].length==0||op[2].length==0||op[3].length==0||op[4].length==0||answer==null){
                        modalContent.appendChild(errorMessage);
                        errorMessage.innerHTML="Fill all input fields";
                    }
                    else{
                        errorMessage.innerHTML="";
                        call('POST','add_questions',function(data){
                            console.log(data)
                        },JSON.stringify({'text':text,'op1':op[0],'op2':op[1],'op3':op[2],'op4':op[3],'op5':op[4],
                        'answer':answer, 'careerStage':careerStage, 'difficulty':difficulty, 'technology':technology}))       
                        document.body.removeChild(modalContent.parentElement)
                    }
                    
                    
                }
            }
        }
        if(document.getElementById('add_hr')){
            var addHR = document.getElementById('add_hr');
            addHR.onclick = function(){
                createModal();
                var modalContent = document.getElementById('modalContent');
                var modalHeader = document.getElementById('modalHeader');
                modalHeader.innerHTML = "<h5>Add New HR</h5>"
                var sapientId = document.createElement('input');
                sapientId.type = 'text'; sapientId.placeholder = "Sapient ID"; sapientId.id = 'sapientId';
                var name = document.createElement('input'); 
                name.type = 'text'; name.placeholder = "Name"; name.id = 'newName';
                var email = document.createElement('input');
                email.type = 'email'; email.placeholder = "Email"; email.id = 'newEmail';
                var password = document.createElement('input');
                password.type = 'text'; password.placeholder = "Password"; password.id ='newPassword';
                var role = document.createElement('input');
                role.type = 'text'; role.placeholder = "Type is hr (You are authorized to add only HRs)"; role.id = 'newRole'; role.disabled = true;
                var designation = document.createElement('input');
                designation.type = 'text'; designation.placeholder = "Designation"; designation.id = 'newDesignation';
                var submitForm = document.createElement('button');
                submitForm.id = "submitUser";
                submitForm.innerHTML = 'Submit';
                submitForm.className="btn";
                modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + role.outerHTML + designation.outerHTML + submitForm.outerHTML + '<br/>';
                document.getElementById("submitUser").onclick = function(){
                    var sapientId = document.getElementById('sapientId').value;
                    var name = document.getElementById('newName').value;
                    var email = document.getElementById('newEmail').value;
                    var password = document.getElementById('newPassword').value;
                    var designation = document.getElementById('newDesignation').value;
                    if(sapientId.length==0||name.length==0||email.length==0||password.length==0){
                        modalContent.appendChild(errorMessage);
                        errorMessage.innerHTML="Fill all input fields";
                    }
                    if(!email.match(emailRegex)){
                        modalContent.appendChild(errorMessage);
                        errorMessage.innerHTML="Email Format is wrong";
                    }
                    else{
                        call('POST','add_users',function(data){
                            console.log(data)
                        },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':'hr','designation':designation}))       
                        document.body.removeChild(modalContent.parentElement)
                    }
                    
                }
            }
        }
        if(document.getElementById('add_candidate')){
            var addCandidate = document.getElementById('add_candidate');
            addCandidate.onclick = function(){
    
            }
        }
        if(document.getElementById('review_candidate')){
            var reviewCandidate = document.getElementById('review_candidate');
            reviewCandidate.onclick = function(){

            }
        }
        if(document.getElementById('add_interviewer')){
            var addHR = document.getElementById('add_interviewer');
            addHR.onclick = function(){
                createModal();
                var modalContent = document.getElementById('modalContent');
                var modalHeader = document.getElementById('modalHeader');
                modalHeader.innerHTML = "<h5>Add New Interviewer</h5>"
                var sapientId = document.createElement('input');
                sapientId.type = 'text'; sapientId.placeholder = "Sapient ID"; sapientId.id = 'sapientId';
                var name = document.createElement('input'); 
                name.type = 'text'; name.placeholder = "Name"; name.id = 'newName';
                var email = document.createElement('input');
                email.type = 'email'; email.placeholder = "Email"; email.id = 'newEmail';
                var password = document.createElement('input');
                password.type = 'text'; password.placeholder = "Password"; password.id ='newPassword';
                var role = document.createElement('input');
                role.type = 'text'; role.placeholder = "Type is interviewer (You are authorized to add only interviewers)"; role.id = 'newRole'; role.disabled = true;
                var designation = document.createElement('input');
                designation.type = 'text'; designation.placeholder = "Designation"; designation.id = 'newDesignation';
                var submitForm = document.createElement('button');
                submitForm.id = "submitUser";
                submitForm.innerHTML = 'Submit';
                submitForm.className="btn";
                modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + role.outerHTML + designation.outerHTML + submitForm.outerHTML + '<br/>';
                document.getElementById("submitUser").onclick = function(){
                    var sapientId = document.getElementById('sapientId').value;
                    var name = document.getElementById('newName').value;
                    var email = document.getElementById('newEmail').value;
                    var password = document.getElementById('newPassword').value;
                    var designation = document.getElementById('newDesignation').value;
                    if(sapientId.length==0||name.length==0||email.length==0||password.length==0||designation.length==0){
                        modalContent.appendChild(errorMessage);
                        errorMessage.innerHTML="Fill all input fields";
                    }
                    if(!email.match(emailRegex)){
                        modalContent.appendChild(errorMessage);
                        errorMessage.innerHTML="Email Format is wrong";
                    }
                    else{
                        call('POST','add_users',function(data){
                            console.log(data)
                        },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':'interviewer','designation':designation}))       
                        document.body.removeChild(modalContent.parentElement)
                    }
                    
                }
            }
        }
        if(document.getElementById('create_quiz')){
            var reviewCandidate = document.getElementById('create_quiz');
            reviewCandidate.onclick = function(){
    
            }
        }
        if(document.getElementById('skill_matrix')){
            var reviewCandidate = document.getElementById('skill_matrix');
            reviewCandidate.onclick = function(){
                
            }
        }
    });
    // call('POST','editPassword',function(data){console.log(data)});
    //call('POST','changeQuestionStatus',function(data){console.log(data)});
})()