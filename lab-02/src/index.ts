import 'bootstrap/dist/css/bootstrap.min.css';
import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { StorageService } from './services/Storage';
import { NotificationService } from './services/NotificationService';
import { generateNumericId } from './utils/idGenerator';
import { BookForm } from './components/BookForm';
import { UserForm } from './components/UserForm';
import { BookList } from './components/BookList';
import { UserList } from './components/UserList';
import { ModalComponent } from './components/Modal';
import { Validation } from './utils/validators';

class App {
    private bookLibrary: Library<Book>;
    private userLibrary: Library<User>;
    private appContainer: HTMLElement;
    private searchQuery: string = '';

    constructor() {
        this.appContainer = document.getElementById('app') as HTMLElement;
        NotificationService.init(this.appContainer);

        const savedBooks = StorageService.load<Book>('books').map(
            (b) => new Book(b.id, b.title, b.author, b.year, b.isBorrowed, b.borrowedByUserId),
        );
        const savedUsers = StorageService.load<User>('users').map(
            (u) => new User(u.id, u.name, u.email, u.borrowedBooksCount),
        );

        this.bookLibrary = new Library<Book>(savedBooks);
        this.userLibrary = new Library<User>(savedUsers);

        this.renderUI();
    }

    private saveData(): void {
        StorageService.save('books', this.bookLibrary.getAll());
        StorageService.save('users', this.userLibrary.getAll());
    }

    private renderUI(): void {
        this.appContainer.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'container py-4';
        container.style.maxWidth = '900px';

        const header = document.createElement('h2');
        header.className = 'text-center mb-4 fw-bold';
        header.textContent = 'Система Управління Бібліотекою';
        container.appendChild(header);

        container.appendChild(BookForm.render(this.handleAddBook.bind(this)));
        container.appendChild(UserForm.render(this.handleAddUser.bind(this)));

        const filteredBooks = this.bookLibrary.search((b) => {
            const q = this.searchQuery.toLowerCase();
            return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
        });

        container.appendChild(
            BookList.render(
                filteredBooks,
                this.handleBorrowRequest.bind(this),
                this.handleReturnRequest.bind(this),
                this.handleDeleteBook.bind(this),
                (query) => {
                    this.searchQuery = query;
                    this.renderUI();
                },
                this.searchQuery,
            ),
        );

        container.appendChild(
            UserList.render(this.userLibrary.getAll(), this.handleDeleteUser.bind(this)),
        );

        this.appContainer.appendChild(container);
    }

    private handleAddBook(title: string, author: string, year: number): void {
        const newBook = new Book(generateNumericId(), title, author, year);
        this.bookLibrary.add(newBook);
        this.saveData();
        this.renderUI();
        NotificationService.show(`Книгу "${title}" успішно додано!`);
    }

    private handleAddUser(name: string, email: string): void {
        const newUser = new User(generateNumericId(), name, email);
        this.userLibrary.add(newUser);
        this.saveData();
        this.renderUI();
        NotificationService.show(`Користувача ${name} додано!`);
    }

    private handleBorrowRequest(book: Book): void {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'mb-2';
        const inputLabel = document.createElement('label');
        inputLabel.className = 'form-label';
        inputLabel.textContent = 'Введіть ID користувача для позичення книги:';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.placeholder = 'ID';

        inputGroup.appendChild(inputLabel);
        inputGroup.appendChild(input);

        ModalComponent.createModal('Позичити книгу', inputGroup, () => {
            const userId = input.value.trim();
            if (!Validation.isNumericId(userId)) {
                NotificationService.show('Помилка: ID повинен містити лише цифри!', 'danger');
                return;
            }

            const user = this.userLibrary.findById(userId);
            if (!user) {
                NotificationService.show('Користувача з таким ID не знайдено!', 'danger');
                return;
            }

            if (user.borrowedBooksCount >= 3) {
                ModalComponent.showInfoModal(
                    `Користувач ${user.name} вже позичив максимальну кількість книг (3)!`,
                    'Закрити',
                );
                return;
            }

            book.isBorrowed = true;
            book.borrowedByUserId = user.id;
            user.borrowedBooksCount += 1;

            this.saveData();
            this.renderUI();

            ModalComponent.showInfoModal(
                `${book.Info} has been borrowed by ${user.DisplayName}.`,
                'Зрозуміло!',
            );
        });
    }

    private handleReturnRequest(book: Book): void {
        if (book.borrowedByUserId) {
            const user = this.userLibrary.findById(book.borrowedByUserId);
            if (user && user.borrowedBooksCount > 0) {
                user.borrowedBooksCount -= 1;
            }
        }

        book.isBorrowed = false;
        book.borrowedByUserId = undefined;

        this.saveData();
        this.renderUI();

        ModalComponent.showInfoModal(`${book.Info} has been returned.`, 'Закрити');
    }

    private handleDeleteBook(id: string): void {
        this.bookLibrary.remove(id);
        this.saveData();
        this.renderUI();
        NotificationService.show('Книгу видалено', 'warning');
    }

    private handleDeleteUser(id: string): void {
        this.userLibrary.remove(id);
        this.saveData();
        this.renderUI();
        NotificationService.show('Користувача видалено', 'warning');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});