export const notification = {
    success(message: string) {
        const toastAncestor = document.createElement('div');
        toastAncestor.className = 'toastAncestor';
        toastAncestor.style.backgroundColor = 'green';

        const toastContent = document.createElement('div');
        toastContent.className = 'toastContent';
        toastContent.textContent = message;

        toastAncestor.appendChild(toastContent);

        toastAncestor.onclick = function () {
            toastAncestor.style.animation = 'slide-out 0.5s forwards';
            setTimeout(() => {
                toastAncestor.remove();
            }, 500);
        };

        document.body.appendChild(toastAncestor);

        setTimeout(() => {
            (toastAncestor.onclick as () => void)();
        }, 5000);
    },

    error(message: string) {
        const toastAncestor = document.createElement('div');
        toastAncestor.className = 'toastAncestor';
        toastAncestor.style.backgroundColor = 'red';

        const toastContent = document.createElement('div');
        toastContent.className = 'toastContent';
        toastContent.textContent = message;

        toastAncestor.appendChild(toastContent);

        toastAncestor.onclick = function () {
            toastAncestor.style.animation = 'slide-out 0.5s forwards';
            setTimeout(() => {
                toastAncestor.remove();
            }, 500);
        };

        document.body.appendChild(toastAncestor);

        setTimeout(() => {
            (toastAncestor.onclick as () => void)();
        }, 5000);
    },
};
