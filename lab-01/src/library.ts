// 1. Інтерфейс бібліотечного елемента
interface LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean;
    borrow(): void;
}

// 2. Клас Книга (зі специфічною властивістю pagesCount)
class Book implements LibraryItem {
    public isBorrowed: boolean = false;

    constructor(
        public title: string,
        public author: string,
        public pagesCount: number
    ) {}

    borrow(): void {
        if (this.isBorrowed) {
            console.log(`[Відмова] Книга "${this.title}" уже видана читачеві.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`[Видано] Книгу "${this.title}" (${this.pagesCount} стор.) успішно позичено.`);
    }
}

// 3. Клас Журнал (зі специфічною властивістю issueNumber)
class Magazine implements LibraryItem {
    public isBorrowed: boolean = false;

    constructor(
        public title: string,
        public author: string,
        public issueNumber: number
    ) {}

    borrow(): void {
        if (this.isBorrowed) {
            console.log(`[Відмова] Журнал "${this.title}" №${this.issueNumber} уже на руках.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`[Видано] Журнал "${this.title}" №${this.issueNumber} видано читачеві.`);
    }
}

// 4. Клас DVD-диск (зі специфічною властивістю durationMinutes)
class DVD implements LibraryItem {
    public isBorrowed: boolean = false;

    constructor(
        public title: string,
        public author: string, // Режисер або студія
        public durationMinutes: number
    ) {}

    borrow(): void {
        if (this.isBorrowed) {
            console.log(`[Відмова] Диск "${this.title}" уже взяли.`);
            return;
        }
        this.isBorrowed = true;
        console.log(`[Видано] DVD "${this.title}" (${this.durationMinutes} хв.) успішно видано.`);
    }
}

// 5. Клас Library для керування колекцією
class Library {
    private items: LibraryItem[] = [];

    // Додавання елемента до фонду
    addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`До бібліотеки додано: "${item.title}"`);
    }

    // Пошук за назвою
    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find((i) => i.title.toLowerCase() === name.toLowerCase());
    }

    // Список доступних матеріалів
    listAvailableItems(): void {
        console.log("\n=== Доступні матеріали в залі ===");
        const available = this.items.filter((item) => !item.isBorrowed);

        if (available.length === 0) {
            console.log("Наразі всі матеріали позичено.");
            return;
        }

        available.forEach((item) => {
            console.log(`- "${item.title}" (Автор/Студія: ${item.author})`);
        });
        console.log("=================================\n");
    }
}

// 6. Демонстрація роботи бібліотеки
const library = new Library();

// Створення екземплярів
const book = new Book("Чистий код", "Роберт Мартін", 464);
const magazine = new Magazine("Forbes", "Forbes Media", 142);
const dvd = new DVD("Оппенгеймер", "Крістофер Нолан", 180);

// Додавання до бібліотеки
console.log("--- Наповнення бібліотеки ---");
library.addItem(book);
library.addItem(magazine);
library.addItem(dvd);

// Виведення списку доступних
library.listAvailableItems();

// Позичення предметів
console.log("--- Видача матеріалів ---");
book.borrow();
book.borrow(); // Спроба позичити вдруге
dvd.borrow();

// Оновлений список доступних
library.listAvailableItems();

// Пошук елемента за назвою
console.log("--- Пошук елемента ---");
const searched = library.findItemByName("Forbes");
if (searched) {
    console.log(`Знайдено: "${searched.title}", Статус: ${searched.isBorrowed ? "позичено" : "доступно"}`);
}