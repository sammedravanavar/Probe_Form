(function(){
    'use strict';
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
    call('POST','review_questions',function(data){
        console.log(data);
        var row = document.getElementById('questionContainer');
        for (let i=0;i<3;i++){
            var colDiv = document.createElement('div');
            colDiv.className="col s12 m12";
            colDiv.setAttribute('id',data[i].qId);
            var card = document.createElement('div');
            card.className = "card purple lighten-1";
            var cardContent = document.createElement('div');
            cardContent.className = "card-content white-text";
            var title = document.createElement('span');
            title.className = "card-title";
            title.innerHTML = "Question";
            var text = document.createElement('p');
            text.innerHTML = data[i].text;
            var options = document.createElement('p');
            options.innerHTML = data[i].op1 + " ";
            options.innerHTML += data[i].op2 + " ";
            options.innerHTML += data[i].op3 + " ";
            options.innerHTML += data[i].op4 + " ";
            options.innerHTML += data[i].op5 + " ";
            options.innerHTML += data[i].answer;
            var breakLine1 = document.createElement('hr');
            var breakLine2 = document.createElement('hr');
            var breakLine3 = document.createElement('hr');
            var attributes = document.createElement('p');
            attributes.innerHTML = data[i].technology;
            attributes.innerHTML += data[i].careerStage
        }
    });
})();