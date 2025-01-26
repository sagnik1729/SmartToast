class ToastPopup {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('form-tp').addEventListener('submit', this.onSubmit);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const posX = e.target["tp-pos-x"].value;
        const posY = e.target["tp-pos-y"].value;
        const type = e.target["tp-type"].value;
        const message = e.target["tp-message"].value.trim();
        const duration = parseInt(e.target["tp-duration"].value);

        const container = this.getToastContainer(posX, posY);
        const toast = this.createToast(message, type, duration);

        container.appendChild(toast);
        
        setTimeout(() => this.removeToast(toast), duration);
    };

    getToastContainer(posX, posY) {
        let container = document.querySelector(`.toast-popup-container.${posX}.${posY}`);
        
        if (!container) {
            container = document.createElement('div');
            container.classList.add('toast-popup-container', posX, posY);
            document.body.appendChild(container);
        }
        
        return container;
    }

    createToast(message, type, duration) {
        const toast = document.createElement('div');
        toast.classList.add('toast-popup', type);

        const msg = document.createElement('span');
        msg.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('btn-tp-del');
        closeBtn.textContent = '✕';
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        toast.appendChild(msg);
        toast.appendChild(closeBtn);

        return toast;
    }

    removeToast(toast) {
        toast.style.animation = "fadeOut 0.3s ease-in-out";
        toast.addEventListener('animationend', () => toast.remove());
    }
}

new ToastPopup();
