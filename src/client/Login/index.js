import {pf, call} from '../utilities/utilities.js'
import Component from '../lib/component.js'

var login = function(){
    let email = pf('username').value;
    let password = pf('password').value;
    call('POST','login',function(data){
        console.log(data)
        window.location.href = '/admin/dashboard';
    },JSON.stringify({'email':email,'pass':password}))
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