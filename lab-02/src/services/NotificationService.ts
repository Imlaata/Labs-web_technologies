export class NotificationService {
    private static container: HTMLElement | null = null;

    public static init(appElement: HTMLElement): void {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        appElement.appendChild(toastContainer);
        this.container = toastContainer;
    }

    public static show(message: string, type: 'success' | 'warning' | 'danger' = 'success'): void {
        if (!this.container) return;

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0 show mb-2`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

        this.container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
}