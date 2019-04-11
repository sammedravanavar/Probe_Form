var validate = function (permission, parameterArr,modalContent) {
    var passRegex = /^[A-Za-z0-9]\w{5,20}$/;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (permission) {
        case 'add_user': return add_user(parameterArr, emailRegex,modalContent); break;
        case 'add_questions': return add_questions(parameterArr,modalContent); break;
        case 'create_role': return create_role(parameterArr,modalContent); break;
        case 'login': return loginValidate(parameterArr,passRegex,modalContent,emailRegex);break;
    }
}
var add_user = function (parameterArr, emailRegex,modalContent) {
    var errorMessage;
    if(modalContent.childNodes.length<9){
        errorMessage = document.createElement('label');
        errorMessage.id = "err";
        errorMessage.style.color = "red";
        errorMessage.innerHTML = "";
        modalContent.appendChild(errorMessage);
    }
    if(modalContent.childNodes.length==9){
        errorMessage = document.getElementById('err');
    }
    if (parameterArr[0].length == 0 || parameterArr[1].length == 0 || parameterArr[2].length == 0 || parameterArr[3].length == 0) {
        errorMessage.innerHTML = '<br/>'+"Fill all input fields" + '<br/>';
        return false;
    }
    if (!parameterArr[2].match(emailRegex)) {
        errorMessage.innerHTML = "";
        errorMessage.innerHTML += '<br/>'+"Email Format is wrong";
        return false;
    }
    return true;
}
var add_questions = function (parameterArr,modalContent) {
    var errorMessage = document.createElement('label');
    errorMessage.id = "err";
    errorMessage.style.color = "red";
    if(modalContent.childNodes.length<15){
        modalContent.appendChild(errorMessage);
    }
    errorMessage.innerHTML = "";
    if (parameterArr[0].length == 0 || parameterArr[1][0].length == 0 || parameterArr[1][1].length == 0 || parameterArr[1][2].length == 0 || parameterArr[1][3].length == 0 || parameterArr[1][4].length == 0 || parameterArr[2].length==0) {
        errorMessage.innerHTML = '<br/>'+"Fill all input fields"+'<br/>';
        if(parameterArr[2].length>0 && (parseInt(parameterArr[2])<1 || parseInt(parameterArr[2])>5)){
            errorMessage.innerHTML += "Answer is not within appropriate range"+'<br/>';
        }
        return false;
    }
    errorMessage.innerHTML = "";
    return true;
}
var create_role = function (parameterArr,modalContent) {
    var errorMessage;
    if(modalContent.childNodes.length<5){
        errorMessage = document.createElement('label');
        errorMessage.id = "err";
        errorMessage.style.color = "red";
        modalContent.appendChild(errorMessage);
    }
    if(modalContent.childNodes.length==5){
        errorMessage = document.getElementById('err');
    }
    if (parameterArr[0].length == 0) {
        errorMessage.innerHTML = '<br/>'+"Role Name must be added" + '<br/>';
        return false;
    }
    if (parameterArr[1].length == 0) {
        errorMessage.innerHTML = "";
        errorMessage.innerHTML = '<br/>'+  "At least 1 permission must be selected";
        return false;
    }
    errorMessage.innerHTML = "";
    return true;
}
function loginValidate(parameterArr, passRegex,modalContent,emailRegex) {
    var errorMessage = document.createElement('h5');
    errorMessage.id = "err";
    errorMessage.style.color = "red";
    if (!parameterArr[1].match(passRegex)) {
        modalContent.appendChild(errorMessage);
        errorMessage.innerHTML="";
        var err2 = "wrong password format"
        errorMessage.innerHTML = err2;
        return false;
    }
    if(!parameterArr[0].match(emailRegex)){
        modalContent.appendChild(errorMessage);
        errorMessage.innerHTML="";
        errorMessage.innerHTML = "wrong email format";
        return false;
    }
    else{
        errorMessage.innerHTML="";
        return true;
    }
}
export {validate};