import Component from '../lib/component.js';
import {pf} from '../utilities/utilities.js';

class Navbar extends Component{
    constructor(){
        super();
    }
    enable() {
        pf("logout").addEventListener('click', () => {
            location.href = "/v1/apis/logout";
        })
    }
}

export default Navbar;