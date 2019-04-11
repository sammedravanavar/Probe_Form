import Component from '../lib/component.js'
import {pf, call} from '../utilities/utilities.js'
import {createCard} from '../utilities/createCard.js';

class Cards extends Component{
    constructor(){
        super();
    }
    enable() {
        call('GET','getPermissions',function(data){
            var permissions = [];
            data.forEach(object=>{
                permissions.push(object.permission)
            })
            var row = pf('cards');
            permissions.forEach((permission,i)=>{
                createCard(permission,row);
            })
        })
    }
}

export default Cards;