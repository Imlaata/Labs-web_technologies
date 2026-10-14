import { Validation } from '../utils/validators';

export class UserForm {
    public static render(onAddUser: (name: string, email: string) => void): HTMLElement {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleHeader = document.createElement('h5');
        titleHeader.className = 'card-title mb-3 fw-bold';
        titleHeader.textContent = 'Додати Користувача';

        const form = document.createElement('form');

        const nameGroup = document.createElement('div');
        nameGroup.className = 'mb-2';
        const nameInput = document.createElement('input');
        nameInput.className = 'form-control';
        nameInput.placeholder = "Ім'я";
        nameGroup.appendChild(nameInput);

        const emailGroup = document.createElement('div');
        emailGroup.className = 'mb-2';
        const emailInput = document.createElement('input');
        emailInput.className = 'form-control';
        emailInput.placeholder = 'Email';
        emailGroup.appendChild(emailInput);

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-success mt-2';
        submitBtn.textContent = 'Додати Користувача';

        form.onsubmit = (e) => {
            e.preventDefault();
            form.querySelectorAll('.error-msg').forEach((el) => el.remove());

            let valid = true;
            if (!Validation.isNonEmpty(nameInput.value)) {
                this.showError(nameGroup, 'Це поле є обов’язковим');
                valid = false;
            }
            if (!Validation.isValidEmail(emailInput.value)) {
                this.showError(emailGroup, 'Введіть коректний Email');
                valid = false;
            }

            if (valid) {
                onAddUser(nameInput.value.trim(), emailInput.value.trim());
                nameInput.value = '';
                emailInput.value = '';
            }
        };

        form.appendChild(nameGroup);
        form.appendChild(emailGroup);
        form.appendChild(submitBtn);

        cardBody.appendChild(titleHeader);
        cardBody.appendChild(form);
        card.appendChild(cardBody);

        return card;
    }

    private static showError(group: HTMLElement, message: string): void {
        const err = document.createElement('small');
        err.className = 'text-danger error-msg d-block mt-1';
        err.textContent = message;
        group.appendChild(err);
    }
}