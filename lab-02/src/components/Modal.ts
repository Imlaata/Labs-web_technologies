export class ModalComponent {
    public static createModal(
        title: string,
        bodyElement: HTMLElement,
        onConfirm: () => void,
    ): HTMLElement {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';

        const modal = document.createElement('div');
        modal.className = 'modal fade show d-block';
        modal.tabIndex = -1;

        const dialog = document.createElement('div');
        dialog.className = 'modal-dialog modal-dialog-centered';

        const content = document.createElement('div');
        content.className = 'modal-content';

        const header = document.createElement('div');
        header.className = 'modal-header';
        const h5 = document.createElement('h5');
        h5.className = 'modal-title';
        h5.textContent = title;

        const destroy = (): void => {
            modal.remove();
            backdrop.remove();
        };

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn-close';
        closeBtn.onclick = destroy;

        header.appendChild(h5);
        header.appendChild(closeBtn);

        const body = document.createElement('div');
        body.className = 'modal-body';
        body.appendChild(bodyElement);

        const footer = document.createElement('div');
        footer.className = 'modal-footer';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.textContent = 'Скасувати';
        cancelBtn.onclick = destroy;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-primary';
        saveBtn.textContent = 'Зберегти';
        saveBtn.onclick = () => {
            onConfirm();
            destroy();
        };

        footer.appendChild(cancelBtn);
        footer.appendChild(saveBtn);

        content.appendChild(header);
        content.appendChild(body);
        content.appendChild(footer);
        dialog.appendChild(content);
        modal.appendChild(dialog);

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        return modal;
    }

    public static showInfoModal(message: string, buttonText: string = 'Зрозуміло!'): void {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';

        const modal = document.createElement('div');
        modal.className = 'modal fade show d-block';

        const dialog = document.createElement('div');
        dialog.className = 'modal-dialog modal-dialog-centered';

        const content = document.createElement('div');
        content.className = 'modal-content p-3 text-center';

        const p = document.createElement('p');
        p.className = 'my-3 fs-5';
        p.textContent = message;

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary mx-auto';
        btn.style.width = '120px';
        btn.textContent = buttonText;
        btn.onclick = () => {
            modal.remove();
            backdrop.remove();
        };

        content.appendChild(p);
        content.appendChild(btn);
        dialog.appendChild(content);
        modal.appendChild(dialog);

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
    }
}