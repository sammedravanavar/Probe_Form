const createModal = () => {
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = "block";
    let modalContent = document.createElement('div');
    modalContent.className = "modal-content";
    modalContent.id = "modalContent"
    let modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";
    modalHeader.id = "modalHeader";
    let close = document.createElement('span');
    close.className = 'close';
    close.innerHTML = '&times';
    document.body.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(close);
    close.onclick = () => {
        document.body.removeChild(modal)
    }
    window.onclick = event => {
        if (event.target == modal) {
            document.body.removeChild(modal)
        }
    }
}

export default createModal;