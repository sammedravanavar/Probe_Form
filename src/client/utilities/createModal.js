var createModal = function(){
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = "block";
    var modalContent = document.createElement('div');
    modalContent.className = "modal-content";
    modalContent.id = "modalContent"
    var modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";
    modalHeader.id = "modalHeader";
    var close = document.createElement('span');
    close.className = 'close';
    close.innerHTML = '&times';
    document.body.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(close);
    close.onclick = function() {
        document.body.removeChild(modal)
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            document.body.removeChild(modal)
        }
    }
}

export {createModal};