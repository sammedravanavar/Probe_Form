const call = (method,endpoint,callback,body) => {
    let request = new XMLHttpRequest()
    request.open(method, '/v1/apis/'+endpoint, true)
    request.onload = function(){
        let data = JSON.parse(this.response)
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

const pf = node => {
    return document.getElementById(node);
}

const formatString = string => {
    return  string.replace('_',' ').split(' ').map(
        (s) => s.charAt(0).toUpperCase() + s.substring(1)
    ).join(' ');
}

const tempAlert = (msg,duration) => {
    let el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    el.innerHTML = msg;
    setTimeout( () => {
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

const createErrorMessageHolder = () => {
    let modalError = document.createElement('div');
    modalError.className = 'errorMessage';
    return modalError;
}

export {call, pf, formatString, tempAlert, createErrorMessageHolder};