import {pf, call, formatString} from '../utilities/utilities.js'
import Component from '../lib/component.js'

let name = pf('name');
let email = pf('email');
let designation = pf('designation');
let type = pf('type');
let cancel = pf('cancel');
let submit = pf('submit');
let editProfile = pf('editProfile');
let changePassword = pf('changePassword');

var setDefault = function(){
    cancel.style.display= 'none';
    submit.style.display= 'none';
    editProfile.style.display= '';
    changePassword.style.display= '';
    name.disabled = true;
    email.disabled = true;
    designation.disabled = true;
}

var editProf = function(){
    let currentName = name.value;
    let currentEmail = email.value;
    let currentDesgnation = designation.value;
    cancel.style.display = '';
    submit.style.display= '';
    editProfile.style.display= 'none';
    changePassword.style.display= 'none';
    name.disabled = false;
    email.disabled = false;
    designation.disabled = false;
    cancel.addEventListener('click',function(){
        setDefault();
        name.value = currentName;
        email.value = currentEmail;
        designation.value = currentDesgnation;
    })
    submit.addEventListener('click',function(){
        setDefault();
        let newName = name.value;
        let newEmail = email.value;
        let newDesgnation = designation.value;
        call('POST','editEmployee',function(data){console.log(data)}, JSON.stringify({'name':newName,'email':newEmail,'designation':newDesgnation}));
    })
}

class Profile extends Component{
    constructor(){
        super();
    }
    enable() {
        setDefault();
        call('GET','getEmployeeDetails',function(data){
            name.value = (data.name).charAt(0).toUpperCase()+(data.name).slice(1);
            email.value = data.email;
            designation.value = data.designation;
            type.innerHTML = formatString(data.type)
        });
        editProfile.addEventListener('click',editProf)
    }
}

export default Profile;