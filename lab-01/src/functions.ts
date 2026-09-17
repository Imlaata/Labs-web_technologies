// Функція приймає рядок і число з дефолтним значенням
function printStudentInfo(fullName: string, groupNumber: number = 1): void {
    console.log(`Студент: ${fullName}, Номер групи: ${groupNumber}`);
}

// Перевірка: виклик із дефолтним значенням
printStudentInfo("Добровольська Злата");

// Перевірка: виклик із переданим значенням
printStudentInfo("Олександр Петров", 3);