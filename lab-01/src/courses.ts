// 1. Інтерфейс курсу
interface Course {
    name: string;
    duration: number; // тривалість у годинах
    students: string[];
}

// 2. Клас OnlineCourse, що імплементує інтерфейс Course
class OnlineCourse implements Course {
    public students: string[] = [];

    constructor(
        public name: string,
        public duration: number
    ) {}

    // Перевірка, чи студент уже зареєстрований
    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }

    // Реєстрація студента на курс із перевіркою дублікатів
    registerStudent(student: string): void {
        if (this.isStudentRegistered(student)) {
            console.log(`[Увага] Студент "${student}" вже зареєстрований на курс "${this.name}".`);
            return;
        }
        this.students.push(student);
        console.log(`[Успіх] Студента "${student}" зараховано на курс "${this.name}".`);
    }
}

// 3. Клас CourseManager для керування курсами
class CourseManager {
    private courses: Course[] = [];

    // Додавання курсу
    addCourse(course: Course): void {
        this.courses.push(course);
        console.log(`Курс "${course.name}" успішно додано до каталогу.`);
    }

    // Видалення курсу за назвою
    removeCourse(courseName: string): void {
        const initialLength = this.courses.length;
        this.courses = this.courses.filter(
            (c) => c.name.toLowerCase() !== courseName.toLowerCase()
        );

        if (this.courses.length < initialLength) {
            console.log(`Курс "${courseName}" видалено.`);
        } else {
            console.log(`Курс "${courseName}" не знайдено для видалення.`);
        }
    }

    // Пошук курсу за назвою
    findCourse(courseName: string): Course | undefined {
        return this.courses.find(
            (c) => c.name.toLowerCase() === courseName.toLowerCase()
        );
    }

    // Виведення списку курсів та їхніх студентів
    displayAllCourses(): void {
        console.log("\n=== Список курсів та зареєстрованих студентів ===");
        if (this.courses.length === 0) {
            console.log("Список курсів порожній.");
            return;
        }

        this.courses.forEach((course) => {
            const studentList = course.students.length > 0 ? course.students.join(", ") : "немає зареєстрованих студентів";
            console.log(`- Курс: "${course.name}" | Тривалість: ${course.duration} год.`);
            console.log(`  Слухачі: ${studentList}`);
        });
        console.log("===============================================\n");
    }
}

// 4. Демонстрація роботи системи
const manager = new CourseManager();

// Створення кількох курсів
const tsCourse = new OnlineCourse("TypeScript Advanced", 45);
const webArchCourse = new OnlineCourse("Web Architecture & Patterns", 60);
const devOpsCourse = new OnlineCourse("DevOps Essentials", 30);

// Додавання до менеджера
manager.addCourse(tsCourse);
manager.addCourse(webArchCourse);
manager.addCourse(devOpsCourse);

// Реєстрація студентів
console.log("\n--- Реєстрація студентів ---");
tsCourse.registerStudent("Злата Добровольська");
tsCourse.registerStudent("Олексій Коваленко");
tsCourse.registerStudent("Злата Добровольська"); // Спроба додати повторно

webArchCourse.registerStudent("Злата Добровольська");
webArchCourse.registerStudent("Данило Мороз");

// Відображення курсів
manager.displayAllCourses();

// Пошук і видалення
console.log("--- Пошук курсу ---");
const found = manager.findCourse("DevOps Essentials");
console.log(found ? `Знайдено: ${found.name} (${found.duration} год.)` : "Не знайдено");

console.log("\n--- Видалення курсу ---");
manager.removeCourse("DevOps Essentials");
manager.displayAllCourses();