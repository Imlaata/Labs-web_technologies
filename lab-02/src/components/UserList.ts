import { User } from '../models/User';

export class UserList {
    public static render(users: User[], onDeleteUser: (id: string) => void): HTMLElement {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title fw-bold mb-3';
        title.textContent = 'Список Користувачів';

        cardBody.appendChild(title);

        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush';

        if (users.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item text-muted';
            li.textContent = 'Користувачів не додано.';
            ul.appendChild(li);
        } else {
            users.forEach((user) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center py-2';

                const infoSpan = document.createElement('span');
                infoSpan.textContent = user.DisplayName;

                const rightBox = document.createElement('div');
                rightBox.className = 'd-flex align-items-center';

                const badge = document.createElement('span');
                badge.className = 'badge bg-secondary me-3';
                badge.textContent = `Книг: ${user.borrowedBooksCount}/3`;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-outline-danger btn-sm';
                deleteBtn.textContent = 'Видалити';
                deleteBtn.onclick = () => onDeleteUser(user.id);

                rightBox.appendChild(badge);
                rightBox.appendChild(deleteBtn);

                li.appendChild(infoSpan);
                li.appendChild(rightBox);
                ul.appendChild(li);
            });
        }

        cardBody.appendChild(ul);
        card.appendChild(cardBody);
        return card;
    }
}