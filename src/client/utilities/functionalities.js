import {pf, call, formatString, tempAlert} from './utilities.js'
import {createModal} from './createModal.js';
import { validate } from './validation.js';

var reviewUsers = function(){
    // window.location.href = '/admin/reviewUsers'
}

var reviewQuestion = function (){
    window.location.href = '/admin/reviewQuestions'
}

var addUsers = function (type) {  
    call('GET','getAllTypes',function(data){
        var roles = [];
        for(var i=0; i<Object.keys(data).length; i++){
            roles.push(data[i].type);
        }
        createModal();
        var modalContent = pf('modalContent');
        var modalHeader = pf('modalHeader');
        modalHeader.innerHTML = `<h5>Add New ${type}</h5>`
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
        if(type == "HR"){
            roleOptions[i] = document.createElement('option');
            roleOptions[i].innerHTML = "hr";
            roleOptions[i].value = "hr";
            roleType.innerHTML += roleOptions[i].outerHTML;
        }
        else if(type == "Interviewer"){
            roleOptions[i] = document.createElement('option');
            roleOptions[i].innerHTML = "interviewer";
            roleOptions[i].value = "interviewer";
            roleType.innerHTML += roleOptions[i].outerHTML;
        }
        else{
            roles.forEach((role,i)=>{
                roleOptions[i] = document.createElement('option');
                roleOptions[i].innerHTML = role;
                roleOptions[i].value = role;
                roleType.innerHTML += roleOptions[i].outerHTML;
            })
        }
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
            if(validate("add_user",[sapientId,name,email,password],modalContent)){
                call('POST','add_users',function(data){
                    console.log(data)
                },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':role,'designation':careerStage}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
    })
}

var createRole = function() {
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
        submitForm.className="btn";
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
            if(validate("create_role",[roleName, checkedPermissionsList], modalContent)){
                call('POST','create_role',function(data){
                },JSON.stringify({'role':roleName,'permissions': checkedPermissionsList}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
    })    
}

var addQuestions = function () {
    var addQuestions = pf('add_questions');
    addQuestions.onclick = function(){
        createModal();
        var modalContent = pf('modalContent');
        var modalHeader = pf('modalHeader');
        modalHeader.innerHTML = "<h5>Add Question</h5>"
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
        answer.min = "1"; answer.max = "5";
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
            console.log(typeof pf('answer').value)
            var careerStage = pf('careerStage').options[pf('careerStage').selectedIndex].value;
            var difficulty = pf('difficulty').options[pf('difficulty').selectedIndex].value;
            var technology = pf('technology').options[pf('technology').selectedIndex].value;
            if(validate('add_questions',[text,op,pf('answer').value],modalContent)){
                call('POST','add_questions',function(data){
                    console.log(data)
                },JSON.stringify({'text':text,'op1':op[0],'op2':op[1],'op3':op[2],'op4':op[3],'op5':op[4],
                'answer':answer, 'careerStage':careerStage, 'difficulty':difficulty, 'technology':technology}))
                document.body.removeChild(modalContent.parentElement)
            }
        }
    }
}

var addCandidate = function () {
    // tempAlert("Page in progress", 3000)
}

var reviewCandidate = function () {
    // tempAlert("Page in progress", 3000)
}

var createQuiz = function () {
    // tempAlert("Page in progress", 3000)
}

var skillMatrix = function () {
    // tempAlert("Page in progress", 3000)
}

var functionalities = function(string){
    switch(string){
        case "review_users": reviewUsers(); break;
        case "review_questions": reviewQuestion(); break; 
        case "add_users": addUsers("User"); break;
        case "create_role": createRole(); break;
        case "add_questions": addQuestions(); break;
        case "add_hr": addUsers("HR"); break;
        case "add_candidate": addCandidate(); break;
        case "review_candidate": reviewCandidate(); break;
        case "add_interviewer": addUsers("Interviewer"); break;
        case "create_quiz": createQuiz(); break;
        case "skill_matrix": skillMatrix(); break;
    }
}

export {functionalities};