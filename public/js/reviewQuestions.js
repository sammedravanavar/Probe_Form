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
    var questionBank;
    call('POST','review_questions',function(data){
        // console.log(data);
        questionBank = data;
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
            options.innerHTML = "A. "+data[i].op1 + "&nbsp&nbsp";
            options.innerHTML += "B. "+data[i].op2 + "&nbsp&nbsp ";
            options.innerHTML += "C. "+data[i].op3 + "&nbsp&nbsp ";
            options.innerHTML += "D. "+data[i].op4 + " &nbsp&nbsp";
            options.innerHTML += "E. "+data[i].op5 + "&nbsp&nbsp ";
            options.innerHTML += "Answer: "+data[i].answer;
            var breakLine1 = document.createElement('hr');
            var breakLine2 = document.createElement('hr');
            var breakLine3 = document.createElement('hr');
            var attributes = document.createElement('p');
            attributes.innerHTML = "Technology: "+data[i].technology + "&nbsp&nbsp&nbsp";
            attributes.innerHTML += "Career Stage: "+data[i].careerStage + "&nbsp&nbsp&nbsp ";
            attributes.innerHTML += "Difficulty: "+data[i].difficulty;
            var fieldset = document.createElement('fieldset');
            fieldset.setAttribute('id',data[i].qId);
            var radioDiv1 = document.createElement('div');
            radioDiv1.className = "col s6 m6 center-align";
            var radioDiv2 = document.createElement('div');
            radioDiv2.className = "col s6 m6 center-align";
            var labelApprove = document.createElement('label');
            var labelReject = document.createElement('label');
            labelApprove.className = "white-text";
            labelReject.className = "white-text";
            labelReject.innerHTML = "Reject";
            labelApprove.innerHTML = "Approve";
            var inputApprove = document.createElement('input')
            var inputReject = document.createElement('input')
            inputApprove.setAttribute('type','radio');
            inputApprove.className="opaque";
            inputApprove.setAttribute('name',data[i].qId);
            inputReject.setAttribute('type','radio');
            inputReject.className="opaque";
            inputReject.setAttribute('name',data[i].qId);
            row.appendChild(colDiv);
            colDiv.appendChild(card);
            card.appendChild(cardContent);
            cardContent.appendChild(title);
            cardContent.appendChild(text);
            cardContent.appendChild(breakLine1);
            cardContent.appendChild(options);
            cardContent.appendChild(breakLine2);
            cardContent.appendChild(attributes);
            cardContent.appendChild(breakLine3);
            cardContent.appendChild(fieldset);
            fieldset.appendChild(radioDiv1);
            radioDiv1.appendChild(labelApprove);
            labelApprove.appendChild(inputApprove);
            fieldset.appendChild(radioDiv2);
            radioDiv2.appendChild(labelReject);
            labelReject.appendChild(inputReject);
        }
    });
    var filterQuestions = function(tech, difficulty, cS, qS){
        console.log(cS);
        var filtered = questionBank.filter(function(question){
            return question.careerStage == cS;
        })
        console.log(filtered)
    }
    document.getElementById('filter').onclick = function(){
        var technology = document.getElementById('tech').options[document.getElementById('tech').selectedIndex].value;
        var difficulty = document.getElementById('dif').options[document.getElementById('dif').selectedIndex].value;
        var careerStage = document.getElementById('career').options[document.getElementById('career').selectedIndex].value;
        var questionStatus = document.getElementById('status').options[document.getElementById('status').selectedIndex].value;
        filterQuestions(technology, difficulty, careerStage. questionStatus);
    }
})();