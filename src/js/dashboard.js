// import {call} from '/js/apiCall.js'; 
import {createModal} from '/js/createModal.js';
// import {formatString} from '/js/formatString.js';
// import {pf} from '/js/probeForm.js';
// import {createCard} from '/js/createCard.js';
(function(){
    'use strict';
       
    call('GET','getPermissions',function(data){
        var permissions = [];
        data.forEach(object=>{
            permissions.push(object.permission)
        })
        var row = pf('cards');
        permissions.forEach((permission,i)=>{
            createCard(permission,row);
        })
        if(pf('review_users')){
            var reviewUsers = pf('review_users');
            reviewUsers.onclick = function(){
                window.location.href = '/admin/reviewUsers'
            }
        }
        if(pf('review_questions')){
            var reviewQuestions = pf('review_questions');
            reviewQuestions.onclick = function(){
                window.location.href = '/admin/reviewQuestions'
            }
        }
        if(pf('add_users')){
            var addUsers = pf('add_users');
            addUsers.onclick = function(){
                call('GET','getAllTypes',function(data){
                    var roles = [];
                    for(var i=0; i<Object.keys(data).length; i++){
                        roles.push(data[i].type);
                    }
                    createModal();
                    var modalContent = pf('modalContent');
                    var modalHeader = pf('modalHeader');
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
                    var designations=["AL1", "AL2", "SAL1", "SAL2"]
                    var desigOptions = [];
                    designations.forEach((d,i)=>{
                        desigOptions[i] = document.createElement('option');
                        desigOptions[i].innerHTML = d;
                        desigOptions[i].value = d;
                        designation.innerHTML +=desigOptions[i].outerHTML;
                    })
                    var submitForm = document.createElement('button');
                    submitForm.id = "submitUser";
                    submitForm.innerHTML = 'Submit';
                    submitForm.className="btn";
                    modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + roleType.outerHTML + designation.outerHTML + submitForm.outerHTML;
                    pf("submitUser").onclick = function(){
                        var sapientId = pf('sapientId').value;
                        var name = pf('newName').value;
                        var email = pf('newEmail').value;
                        var password = pf('newPassword').value;
                        var role = pf('newRole').options[pf('newRole').selectedIndex].value;
                        var careerStage = pf('careerStage').options[pf('careerStage').selectedIndex].value;
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
        if(pf('create_role')){
            var createRoles = pf('create_role');
            createRoles.onclick = function(){
                call('GET','getAllPermissions',function(data){
                    var permissions = data;
                    var permissionList = [];
                    var permissionJson = {};
                    createModal();
                    var modalContent = pf('modalContent');
                    var modalHeader = pf('modalHeader');
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
                    pf("submitForm").onclick = function(){
                        var roleName = pf('role').value
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
        }
        if(pf('add_questions')){
            var addQuestions = pf('add_questions');
            addQuestions.onclick = function(){
                createModal();
                var modalContent = pf('modalContent');
                var modalHeader = pf('modalHeader');
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
                submitForm.id = 'submitQuestion';
                submitForm.innerHTML = 'Submit';
                // submitForm.type = 'submit';
                modalContent.innerHTML += '<br/>' + text.outerHTML + op1.outerHTML + op2.outerHTML + op3.outerHTML + op4.outerHTML + op5.outerHTML + answer.outerHTML + careerStage.outerHTML  + difficulty.outerHTML + technology.outerHTML + '<br/>' + submitForm.outerHTML;
                pf("submitQuestion").onclick = function(){
                    var text = pf('question').value;
                    var op = [];
                    op[0] = pf('op1').value;
                    op[1] = pf('op2').value;
                    op[2] = pf('op3').value;
                    op[3] = pf('op4').value;
                    op[4] = pf('op5').value;
                    var answer = op[pf('answer').value - 1];
                    var careerStage = pf('careerStage').options[pf('careerStage').selectedIndex].value;
                    var difficulty = pf('difficulty').options[pf('difficulty').selectedIndex].value;
                    var technology = pf('technology').options[pf('technology').selectedIndex].value;
                    call('POST','add_questions',function(data){
                        console.log(data)
                    },JSON.stringify({'text':text,'op1':op[0],'op2':op[1],'op3':op[2],'op4':op[3],'op5':op[4],
                    'answer':answer, 'careerStage':careerStage, 'difficulty':difficulty, 'technology':technology}))       
                    document.body.removeChild(modalContent.parentElement)
                }
            }
        }
        if(pf('add_hr')){
            var addHR = pf('add_hr');
            addHR.onclick = function(){
                createModal();
                var modalContent = pf('modalContent');
                var modalHeader = pf('modalHeader');
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
                modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + role.outerHTML + designation.outerHTML + submitForm.outerHTML;
                pf("submitUser").onclick = function(){
                    var sapientId = pf('sapientId').value;
                    var name = pf('newName').value;
                    var email = pf('newEmail').value;
                    var password = pf('newPassword').value;
                    var designation = pf('newDesignation').value;
                    call('POST','add_users',function(data){
                        console.log(data)
                    },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':'hr','designation':designation}))       
                    document.body.removeChild(modalContent.parentElement)
                }
            }
        }
        if(pf('add_candidate')){
            var addCandidate = pf('add_candidate');
            addCandidate.onclick = function(){
    
            }
        }
        if(pf('review_candidate')){
            var reviewCandidate = pf('review_candidate');
            reviewCandidate.onclick = function(){

            }
        }
        if(pf('add_interviewer')){
            var addHR = pf('add_interviewer');
            addHR.onclick = function(){
                createModal();
                var modalContent = pf('modalContent');
                var modalHeader = pf('modalHeader');
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
                modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + role.outerHTML + designation.outerHTML + submitForm.outerHTML;
                pf("submitUser").onclick = function(){
                    var sapientId = pf('sapientId').value;
                    var name = pf('newName').value;
                    var email = pf('newEmail').value;
                    var password = pf('newPassword').value;
                    var designation = pf('newDesignation').value;
                    call('POST','add_users',function(data){
                        console.log(data)
                    },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':'interviewer','designation':designation}))       
                    document.body.removeChild(modalContent.parentElement)
                }
            }
        }
        if(pf('create_quiz')){
            var reviewCandidate = pf('create_quiz');
            reviewCandidate.onclick = function(){
    
            }
        }
        if(pf('skill_matrix')){
            var reviewCandidate = pf('skill_matrix');
            reviewCandidate.onclick = function(){
                
            }
        }
    });
    // pf("logout").onclick = function(){
    //     document.location.href = "/v1/apis/logout";
    // }
    // call('POST','editPassword',function(data){console.log(data)});
    //call('POST','changeQuestionStatus',function(data){console.log(data)});
})()