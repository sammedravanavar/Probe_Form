import {pf, call, formatString, tempAlert, createErrorMessageHolder} from './utilities.js'
import createModal from './createModal.js';
import validate from './validation.js';

const reviewUsers = () => {
    // window.location.href = '/admin/reviewUsers'
}

const reviewQuestion = () => {
    location.href = '/admin/reviewQuestions'
}

const modalError = createErrorMessageHolder();

const addUsers = type => {  
    call('GET','getAllTypes', data =>{
        let roles = [];
        for(let i=0; i<Object.keys(data).length; i++){
            roles.push(data[i].type);
        }
        createModal();
        let modalContent = pf('modalContent');
        let modalHeader = pf('modalHeader');
        modalHeader.innerHTML = `<h5>Add New ${type}</h5>`
        let sapientId = document.createElement('input');
        sapientId.type = 'text'; sapientId.placeholder = "Sapient ID"; sapientId.id = 'sapientId';
        let name = document.createElement('input'); 
        name.type = 'text'; name.placeholder = "Name"; name.id = 'newName';
        let email = document.createElement('input');
        email.type = 'email'; email.placeholder = "Email"; email.id = 'newEmail';
        let password = document.createElement('input');
        password.type = 'text'; password.placeholder = "Password"; password.id ='newPassword';
        let roleType = document.createElement('select');
        roleType.id = 'newRole';
        let roleOptions = []
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
        let designation = document.createElement('select');
        designation.id = 'careerStage';
        let designations=["AL1", "AL2", "SAL1", "SAL2"]
        let desigOptions = [];
        designations.forEach((d,i)=>{
            desigOptions[i] = document.createElement('option');
            desigOptions[i].innerHTML = d;
            desigOptions[i].value = d;
            designation.innerHTML +=desigOptions[i].outerHTML;
        })
        let submitForm = document.createElement('button');
        submitForm.id = "submitUser";
        submitForm.innerHTML = 'Submit';
        submitForm.className="btn";
        modalContent.innerHTML += sapientId.outerHTML + name.outerHTML + email.outerHTML + password.outerHTML + roleType.outerHTML + designation.outerHTML + submitForm.outerHTML;
        modalContent.appendChild(modalError);
        pf("submitUser").onclick = () => {
            let sapientId = pf('sapientId').value;
            let name = pf('newName').value;
            let email = pf('newEmail').value;
            let password = pf('newPassword').value;
            let role = pf('newRole').options[pf('newRole').selectedIndex].value;
            let careerStage = pf('careerStage').options[pf('careerStage').selectedIndex].value;
            if(validate("add_user",[sapientId,name,email,password],modalError)){
                call('POST','add_users', data => {
                    console.log(data)
                },JSON.stringify({'sapientId':sapientId,'name':name,'email':email,'password':password,'type':role,'designation':careerStage}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
    })
}

const createRole = () => {
    call('GET','getAllPermissions', data => {
        let permissions = data;
        let permissionList = [];
        let permissionJson = {};
        createModal();
        let modalContent = pf('modalContent');
        let modalHeader = pf('modalHeader');
        modalHeader.innerHTML = "<h5>Create New Role</h5>";
        let role = document.createElement('input');
        role.type = 'text'; role.placeholder = "Role Name"; role.id="role";
        let container = document.createElement('div'); 
        // container.className = "container";
        container.innerHTML = "<h5>Select Permissions</h5>"
        for(let i=0; i<Object.keys(permissions).length; i++){
            permissionJson[permissions[i].permission] = permissions[i].id;
            permissionList.push(permissions[i].permission)
        }
        permissionList.forEach(permission=>{
            let checckLabel = document.createElement('label');
            checckLabel.for = permission;
            let checkElement = document.createElement('input');
            checkElement.id = permission;
            checkElement.type = 'checkbox';
            checkElement.name = 'permissions';
            checkElement.value = permission;
            checckLabel.innerHTML += checkElement.outerHTML + formatString(permission);
            container.innerHTML += checckLabel.outerHTML + '<br/>';
        })
        let submitForm = document.createElement('button');
        submitForm.id = "submitForm";
        submitForm.className="btn";
        submitForm.style.marginTop = '20px';
        submitForm.innerHTML = 'Submit';
        modalContent.innerHTML += role.outerHTML + container.outerHTML + submitForm.outerHTML;
        modalContent.appendChild(modalError);
        pf("submitForm").onclick = () => {
            let roleName = pf('role').value
            let checkedList = document.querySelectorAll('input[name="'+'permissions'+'"]:checked'),values=[];
            let checkedPermissionsList = [];
            checkedList.forEach(checked=>{
                checkedPermissionsList.push(permissionJson[checked.value])
            })
            if(validate("create_role",[roleName, checkedPermissionsList], modalError)){
                call('POST','create_role', data => {
                },JSON.stringify({'role':roleName,'permissions': checkedPermissionsList}))       
                document.body.removeChild(modalContent.parentElement)
            }
        }
    })    
}

const addQuestions = () => {
    let addQuestions = pf('add_questions');
    addQuestions.onclick = () => {
        createModal();
        let modalContent = pf('modalContent');
        let modalHeader = pf('modalHeader');
        modalHeader.innerHTML = "<h5>Add Question</h5>";
        // let role = document.createElement('input');
        // role.type = 'text'; role.placeholder = "Role Name"; role.id="role";
        let text = document.createElement('textarea');
        text.placeholder = "Question"; text.id = "question";
        let op1 = document.createElement('input');
        op1.type = "text"; op1.placeholder = "Option 1"; op1.id = "op1";
        let op2 = document.createElement('input');
        op2.type = "text"; op2.placeholder = "Option 2"; op2.id = "op2";
        let op3 = document.createElement('input');
        op3.type = "text"; op3.placeholder = "Option 3"; op3.id = "op3";
        let op4 = document.createElement('input');
        op4.type = "text"; op4.placeholder = "Option 4"; op4.id = "op4";
        let op5 = document.createElement('input');
        op5.type = "text"; op5.placeholder = "Option 5"; op5.id = "op5";
        let answer = document.createElement('input');
        answer.type = "number"; answer.placeholder = "Option number of correct answer"; answer.id = "answer";
        answer.min = "1"; answer.max = "5";
        let levels = [], techs = [], stages=[];
        let difficulty = document.createElement('select');
        difficulty.id = 'difficulty';
        ["easy", "medium", "difficult"].forEach((level,i)=>{
            levels[i] = document.createElement('option');
            levels[i].innerHTML = level;
            levels[i].value = level;
            difficulty.innerHTML += levels[i].outerHTML;
        })
        let technology = document.createElement('select');
        technology.id = 'technology';
        ["HTML","CSS","Javascript","JS Libraries/Frameworks","Mobile Web HTML5 Mark-up and APIs","Standards", "Debugging and Optimization","Accessibility"].forEach((tech,i)=>{
            techs[i] = document.createElement('option');
            techs[i].innerHTML = tech;
            techs[i].value = tech;
            technology.innerHTML += techs[i].outerHTML;
        })
        let careerStage = document.createElement('select');
        careerStage.id = 'careerStage';
        ["AL1", "AL2", "SAL1", "SAL2"].forEach((cs,i)=>{
            stages[i] = document.createElement('option');
            stages[i].innerHTML = cs;
            stages[i].value = cs;
            careerStage.innerHTML += stages[i].outerHTML;
        })
        let submitForm = document.createElement('button');
        submitForm.className="btn";
        submitForm.id = 'submitQuestion';
        submitForm.innerHTML = 'Submit';
        // submitForm.type = 'submit';
        modalContent.innerHTML += '<br/>' + text.outerHTML + op1.outerHTML + op2.outerHTML + op3.outerHTML + op4.outerHTML + op5.outerHTML + answer.outerHTML + careerStage.outerHTML  + difficulty.outerHTML + technology.outerHTML + '<br/>' + submitForm.outerHTML;
        modalContent.appendChild(modalError);
        pf("submitQuestion").onclick = () => {
            let text = pf('question').value;
            let op = [];
            op[0] = pf('op1').value;
            op[1] = pf('op2').value;
            op[2] = pf('op3').value;
            op[3] = pf('op4').value;
            op[4] = pf('op5').value;
            let answer = op[pf('answer').value - 1];
            console.log(typeof pf('answer').value)
            let careerStage = pf('careerStage').options[pf('careerStage').selectedIndex].value;
            let difficulty = pf('difficulty').options[pf('difficulty').selectedIndex].value;
            let technology = pf('technology').options[pf('technology').selectedIndex].value;
            if(validate('add_questions',[text,op,pf('answer').value],modalError)){
                call('POST','add_questions', data => {
                    console.log(data)
                },JSON.stringify({'text':text,'op1':op[0],'op2':op[1],'op3':op[2],'op4':op[3],'op5':op[4],
                'answer':answer, 'careerStage':careerStage, 'difficulty':difficulty, 'technology':technology}))
                document.body.removeChild(modalContent.parentElement)
            }
        }
    }
}

const addCandidate = () => {
    // tempAlert("Page in progress", 3000)
}

const reviewCandidate = () => {
    // tempAlert("Page in progress", 3000)
}

const createQuiz = () => {
    // tempAlert("Page in progress", 3000)
}

const skillMatrix = () => {
    // tempAlert("Page in progress", 3000)
}

const functionalities = string => {
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

export default functionalities;