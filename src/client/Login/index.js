import Component from '../lib/component.js';
import {pf, call} from '../utilities/utilities.js';
import validate from '../utilities/validation.js';

const loginCallback = data => {
    if(!(data.error))
        location.href = '/admin/dashboard';
    else{
        let error = pf('errorMessage');
        error.innerHTML = data.error;
    }
}

const login = () => {
    let email = pf('username').value;
    let password = pf('password').value;
    let error = pf('errorMessage');
    error.innerHTML = "";
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