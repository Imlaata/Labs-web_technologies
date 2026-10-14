import { Book } from '../models/Book';

export class BookList {
    private static currentPage = 1;
    private static itemsPerPage = 5;

    public static render(
        books: Book[],
        onBorrowRequest: (book: Book) => void,
        onReturnRequest: (book: Book) => void,
        onDeleteBook: (id: string) => void,
        onSearch: (query: string) => void,
        currentSearchQuery: string = '',
    ): HTMLElement {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const headerContainer = document.createElement('div');
        headerContainer.className = 'd-flex justify-content-between align-items-center mb-3';

        const title = document.createElement('h5');
        title.className = 'card-title fw-bold mb-0';
        title.textContent = 'Список Книг';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'form-control w-50';
        searchInput.placeholder = 'Пошук за назвою або автором...';
        searchInput.value = currentSearchQuery;
        searchInput.oninput = () => onSearch(searchInput.value);

        headerContainer.appendChild(title);
        headerContainer.appendChild(searchInput);
        cardBody.appendChild(headerContainer);

        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush mb-3';

        const totalPages = Math.ceil(books.length / this.itemsPerPage) || 1;
        if (this.currentPage > totalPages) this.currentPage = totalPages;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const paginatedBooks = books.slice(startIndex, startIndex + this.itemsPerPage);

        if (paginatedBooks.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item text-muted';
            li.textContent = 'Книг не знайдено.';
            ul.appendChild(li);
        } else {
            paginatedBooks.forEach((book) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center py-3';

                const textSpan = document.createElement('span');
                textSpan.textContent = book.Info;

                const actionBox = document.createElement('div');

                if (book.isBorrowed) {
                    const returnBtn = document.createElement('button');
                    returnBtn.className = 'btn btn-warning btn-sm me-2 text-dark';
                    returnBtn.textContent = 'Повернути';
                    returnBtn.onclick = () => onReturnRequest(book);
                    actionBox.appendChild(returnBtn);
                } else {
                    const borrowBtn = document.createElement('button');
                    borrowBtn.className = 'btn btn-primary btn-sm me-2';
                    borrowBtn.textContent = 'Позичити';
                    borrowBtn.onclick = () => onBorrowRequest(book);
                    actionBox.appendChild(borrowBtn);
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-outline-danger btn-sm';
                deleteBtn.textContent = 'Видалити';
                deleteBtn.onclick = () => onDeleteBook(book.id);
                actionBox.appendChild(deleteBtn);

                li.appendChild(textSpan);
                li.appendChild(actionBox);
                ul.appendChild(li);
            });
        }

        cardBody.appendChild(ul);

        if (totalPages > 1) {
            const nav = document.createElement('nav');
            const pageUl = document.createElement('ul');
            pageUl.className = 'pagination pagination-sm justify-content-center mb-0';

            for (let i = 1; i <= totalPages; i++) {
                const pageLi = document.createElement('li');
                pageLi.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
                const pageBtn = document.createElement('button');
                pageBtn.className = 'page-link';
                pageBtn.textContent = i.toString();
                pageBtn.onclick = () => {
                    this.currentPage = i;
                    onSearch(currentSearchQuery);
                };
                pageLi.appendChild(pageBtn);
                pageUl.appendChild(pageLi);
            }
            nav.appendChild(pageUl);
            cardBody.appendChild(nav);
        }

        card.appendChild(cardBody);
        return card;
    }
}