// (function(){
    var nameRegex = new RegExp(/^([A-Za-z. ]+){1,20}$/);
    var numberRegex = new RegExp(/[0-9]+/);
    var ageRegex = new RegExp(/^[1-9][0-9]?$/);
    // var passRegex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/);
    var passRegex = /^[A-Za-z0-9]\w{5,20}$/;
    var emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    var error = document.getElementById('errorMessage');
    error.style.color="red";

    function validateLength(e, field) {
        if (field === 'email') {
            if (email.value.length == 0) {
                e.preventDefault();
                var lenErr = 'Min length for email 1 character';
            }
        }
        if (field === 'pass') {
            if (pass.value.length <= 4) {
                e.preventDefault();
                var lenErr = 'Min length for password is 5 characters';
            }
        }
    }
    var keys = document.getElementById("email");
    keys.addEventListener('keypress', function (e) {
        console.log(e);
        console.log(this);
        validateInput(e, emailReg);

        function validateInput(e, regex) {
            if (!regex.test(e.key)) {

               // e.preventDefault();
                var error = "invalid email id";
            }

        }
    });

    var password = document.getElementById("pass");
    password.addEventListener('focusout', function (e) {
        console.log(e);
            console.log(this);
            validateInput(e, passRegex);

            function validateInput(e, regex) {
                if (!password.value.match(regex)) {
                    var err2 = "wrong password format"
                    error.innerHTML = err2;
                   // e.preventDefault();

                }
                else{
                    error.innerHTML="";
                }
                
            }
            
    });

// })();