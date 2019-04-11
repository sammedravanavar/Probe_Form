

var validate = function (permission, parameterArr,modalError) {
    var passRegex = /^[A-Za-z0-9]\w{5,20}$/;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (permission) {
        case 'add_user': return add_user(parameterArr, emailRegex,modalError); break;
        case 'add_questions': return add_questions(parameterArr,modalError); break;
        case 'create_role': return create_role(parameterArr,modalError); break;
        case 'login': return loginValidate(parameterArr,passRegex,emailRegex,modalError);break;
    }
}
var add_user = function (parameterArr, emailRegex,modalError) {
    modalError.innerHTML="";
    if (parameterArr[0].length == 0 || parameterArr[1].length == 0 || parameterArr[2].length == 0 || parameterArr[3].length == 0) {
        modalError.innerHTML = '<br/>'+"Fill all input fields" + '<br/>';
        return false;
    }
    if (!parameterArr[2].match(emailRegex)) {
        modalError.innerHTML = "";
        modalError.innerHTML += '<br/>'+"Email Format is wrong";
        return false;
    }
    return true;
}
var add_questions = function (parameterArr,modalError) {
    modalError.innerHTML = "";
    if (parameterArr[0].length == 0 || parameterArr[1][0].length == 0 || parameterArr[1][1].length == 0 || parameterArr[1][2].length == 0 || parameterArr[1][3].length == 0 || parameterArr[1][4].length == 0 || parameterArr[2].length==0) {
        modalError.innerHTML = '<br/>'+"Fill all input fields"+'<br/>';
        if(parameterArr[2].length>0 && (parseInt(parameterArr[2])<1 || parseInt(parameterArr[2])>5)){
            modalError.innerHTML += "Answer is not within appropriate range"+'<br/>';
        }
        return false;
    }
    modalError.innerHTML = "";
    return true;
}
var create_role = function (parameterArr,modalError) {
    if (parameterArr[0].length == 0) {
        modalError.innerHTML = "";
        modalError.innerHTML = '<br/>'+"Role Name must be added" + '<br/>';
        return false;
    }
    if (parameterArr[1].length == 0) {
        modalError.innerHTML = "";
        modalError.innerHTML = '<br/>'+  "At least 1 permission must be selected";
        return false;
    }
    modalError.innerHTML = "";
    return true;
}
function loginValidate(parameterArr, passRegex,emailRegex,modalError) {
    if (!parameterArr[1].match(passRegex)) {
        modalError.innerHTML="";
        modalError.innerHTML = "wrong password format";
        return false;
    }
    if(!parameterArr[0].match(emailRegex)){
        modalError.innerHTML="";
        modalError.innerHTML = "wrong email format";
        return false;
    }
    else{
        modalError.innerHTML="";
        return true;
    }
}
export {validate};