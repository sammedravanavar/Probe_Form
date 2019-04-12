import {pf, formatString} from './utilities.js'
import functionalities from './functionalities.js';

const createCard = (permission,div) => {
    let colDiv = document.createElement('div');
    colDiv.className = "col s12 m6 xl6";
    colDiv.id = permission;
    let cardDiv = document.createElement('div');
    cardDiv.className = "card";
    let cardContent = document.createElement('div');
    cardContent.className="card-content";
    let span = document.createElement('span');
    span.className = "card-title center-align";
    span.innerHTML = formatString(permission);
    div.appendChild(colDiv);
    colDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardContent);
    cardContent.appendChild(span);
    pf(permission).addEventListener('click',() => {functionalities(permission)})
}

export default createCard;