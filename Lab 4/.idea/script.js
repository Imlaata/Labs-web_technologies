function task1() {
    let fruits = ["яблуко", "банан", "апельсин", "груша"];

    fruits.pop();
    console.log("Завдання 1.1 (Оновлений масив):", fruits);

    fruits.unshift("ананас");

    fruits.sort().reverse();
    console.log("Завдання 1.3 (Відсортовано):", fruits);

    let appleIndex = fruits.indexOf("яблуко");
    console.log("Завдання 1.4 (Індекс 'яблуко'):", appleIndex);
}

function task2() {
    let colors = ["червоний", "синій", "зелений", "темно-синій", "жовтий"];

    let longest = colors.reduce((a, b) => a.length >= b.length ? a : b);
    console.log("Завдання 2.2 (Найдовший колір):", longest);

    let blueColors = colors.filter(c => c.includes("синій"));

    let resultString = blueColors.join(", ");
    console.log("Завдання 2.5 (Рядок кольорів):", resultString);
}

function task3() {
    let staff = [
        { name: "Олег", age: 35, position: "розробник" },
        { name: "Анна", age: 24, position: "дизайнер" },
        { name: "Іван", age: 28, position: "розробник" }
    ];

    staff.sort((a, b) => a.name.localeCompare(b.name));

    let devs = staff.filter(s => s.position === "розробник");
    console.log("Завдання 3.3 (Розробники):", devs);

    staff = staff.filter(s => s.age <= 30);

    staff.push({ name: "Марія", age: 25, position: "HR" });
    console.log("Завдання 3.5 (Оновлений штат):", staff);
}

function task4() {
    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Марина", age: 21, course: 3 },
        { name: "Віктор", age: 19, course: 1 }
    ];

    students = students.filter(s => s.name !== "Олексій");

    students.push({ name: "Петро", age: 22, course: 4 });

    students.sort((a, b) => b.age - a.age);

    let thirdCourseStudent = students.find(s => s.course === 3);

    console.log("Завдання 4 (Усі студенти відсортовані):", students);
    console.log("Завдання 4.5 (Студент 3 курсу):", thirdCourseStudent);
}

function task5() {
    let nums = [1, 2, 3, 4, 5];

    let squares = nums.map(n => n * n);
    console.log("Завдання 5.1 (Квадрати):", squares);

    let evens = nums.filter(n => n % 2 === 0);
    console.log("Завдання 5.2 (Парні):", evens);

    let sum = nums.reduce((acc, n) => acc + n, 0);
    console.log("Завдання 5.3 (Сума):", sum);

    let extraNums = [10, 20, 30, 40, 50];
    let combined = nums.concat(extraNums);

    combined.splice(0, 3);
    console.log("Завдання 5.5 (Після splice):", combined);
}

function libraryManagement() {

    let library = [
        { title: "Кобзар", author: "Шевченко", genre: "Поезія", pages: 400, isAvailable: true }
    ];

    function addBook(title, author, genre, pages) {
        library.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        library = library.filter(b => b.title !== title);
    }

    function findBooksByAuthor(author) {
        return library.filter(b => b.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        let book = library.find(b => b.title === title);
        if (book) book.isAvailable = !isBorrowed;
    }

    function sortBooksByPages() {
        library.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let total = library.length;
        let available = library.filter(b => b.isAvailable).length;
        let borrowed = total - available;
        let avgPages = total === 0 ? 0 : library.reduce((sum, b) => sum + b.pages, 0) / total;

        return { total, available, borrowed, avgPages };
    }

    addBook("1984", "Орвелл", "Антиутопія", 320);
    toggleBookAvailability("Кобзар", true);
    sortBooksByPages();

    console.log("Завдання 6 (Статистика):", getBooksStatistics());
    console.log("Завдання 6 (Поточна бібліотека):", library);
}

function task7() {
    let student = { name: "Олена", age: 20, course: 3 };

    student.subjects = ["Математика", "JavaScript"];

    delete student.age;

    console.log("Завдання 7 (Оновлений об'єкт):", student);
}

task1();
task2();
task3();
task4();
task5();
libraryManagement();
task7();