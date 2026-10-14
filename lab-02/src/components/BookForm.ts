import { Validation } from '../utils/validators';

export class BookForm {
    public static render(onAddBook: (title: string, author: string, year: number) => void): HTMLElement {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const titleHeader = document.createElement('h5');
        titleHeader.className = 'card-title mb-3 fw-bold';
        titleHeader.textContent = 'Додати Книгу';

        const form = document.createElement('form');

        const titleGroup = this.createInputGroup('Назва книги', 'text');
        const authorGroup = this.createInputGroup('Автор', 'text');
        const yearGroup = this.createInputGroup('Рік видання', 'text');

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-success mt-2';
        submitBtn.textContent = 'Додати Книгу';

        form.onsubmit = (e) => {
            e.preventDefault();
            this.clearErrors(form);

            const titleVal = titleGroup.input.value;
            const authorVal = authorGroup.input.value;
            const yearVal = yearGroup.input.value;

            let valid = true;

            if (!Validation.isNonEmpty(titleVal)) {
                this.showError(titleGroup.group, 'Це поле є обов’язковим');
                valid = false;
            }
            if (!Validation.isNonEmpty(authorVal)) {
                this.showError(authorGroup.group, 'Це поле є обов’язковим');
                valid = false;
            }
            if (!Validation.isValidYear(yearVal)) {
                this.showError(yearGroup.group, 'Введіть коректний 4-значний рік');
                valid = false;
            }

            if (valid) {
                onAddBook(titleVal.trim(), authorVal.trim(), parseInt(yearVal.trim(), 10));
                titleGroup.input.value = '';
                authorGroup.input.value = '';
                yearGroup.input.value = '';
            }
        };

        form.appendChild(titleGroup.group);
        form.appendChild(authorGroup.group);
        form.appendChild(yearGroup.group);
        form.appendChild(submitBtn);

        cardBody.appendChild(titleHeader);
        cardBody.appendChild(form);
        card.appendChild(cardBody);

        return card;
    }

    private static createInputGroup(placeholder: string, type: string) {
        const group = document.createElement('div');
        group.className = 'mb-2';

        const input = document.createElement('input');
        input.type = type;
        input.className = 'form-control';
        input.placeholder = placeholder;

        group.appendChild(input);
        return { group, input };
    }

    private static showError(group: HTMLElement, message: string): void {
        const err = document.createElement('small');
        err.className = 'text-danger error-msg d-block mt-1';
        err.textContent = message;
        group.appendChild(err);
    }

    private static clearErrors(form: HTMLElement): void {
        form.querySelectorAll('.error-msg').forEach((el) => el.remove());
    }
}