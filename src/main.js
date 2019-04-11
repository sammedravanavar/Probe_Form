import * as Components from './client/index.js';
(function(){
    let componentsArray = document.querySelectorAll('[data-component]')
    componentsArray.forEach((component, index) => {
        let comp = component.getAttribute('data-component');
        (new Components[comp]).enable()
    })
})()