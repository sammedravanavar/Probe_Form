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

var pf = function(node){
    return document.getElementById(node);
}

var formatString = function(string){
    return  string.replace('_',' ').split(' ').map(
        (s) => s.charAt(0).toUpperCase() + s.substring(1)
    ).join(' ');
}

var tempAlert = function(msg,duration)
{
    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

export {call, pf, formatString, tempAlert};