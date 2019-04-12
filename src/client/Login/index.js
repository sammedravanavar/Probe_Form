import {pf, call} from '../utilities/utilities.js';
import {validate} from '../utilities/validation.js';
import Component from '../lib/component.js';

const loginCallback = data => {
    if(!(data.error))
        location.href = '/admin/dashboard';
    else{
        let error = document.createElement('h5');
        error.style.color = 'red';
        error.innerHTML = data.error;
        pf('login').parentElement.appendChild(error);
    }
}

const login = () => {
    let email = pf('username').value;
    let password = pf('password').value;
    let error = document.getElementsByClassName('errorMessage')[0];
    if(validate('login',[email,password],error)){
        call('POST', 'login', loginCallback, JSON.stringify({'email':email,'pass':password}))
    }
}

class Login extends Component{
    constructor(){
        super();
    }
    enable() {
        pf('login').addEventListener('click',login);
    }
}

export default Login;