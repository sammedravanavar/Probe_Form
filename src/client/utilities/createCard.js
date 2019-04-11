import {pf, formatString} from './utilities.js'
import {functionalities} from './functionalities.js';

var createCard = function(permission,div){
    var colDiv = document.createElement('div');
    colDiv.className = "col s12 m6 xl6";
    colDiv.id = permission;
    var cardDiv = document.createElement('div');
    cardDiv.className = "card";
    var cardContent = document.createElement('div');
    cardContent.className="card-content";
    var span = document.createElement('span');
    span.className = "card-title center-align";
    span.innerHTML = formatString(permission);
    div.appendChild(colDiv);
    colDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardContent);
    cardContent.appendChild(span);
    pf(permission).addEventListener('click',function(){functionalities(permission)})
}

export {createCard};