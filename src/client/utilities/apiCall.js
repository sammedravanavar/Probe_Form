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
export {call};