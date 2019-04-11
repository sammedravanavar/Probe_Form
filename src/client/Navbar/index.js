import {pf} from '../utilities/utilities.js'
import Component from '../lib/component.js'

class Navbar extends Component{
    constructor(){
        super();
    }
    enable() {
        pf("logout").addEventListener('click',function(){
            document.location.href = "/v1/apis/logout";
        })
    }
}

export default Navbar;