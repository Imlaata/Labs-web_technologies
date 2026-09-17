// 1. Оголошення змінних базових типів
const studentName: string = "Злата";
const score: number = 98.5;
const isPassed: boolean = true;
let customPayload: any = "Початкове текстове значення";
customPayload = 2026; // any дозволяє змінити тип на числовий

console.log("Ім'я:", studentName);
console.log("Оцінка:", score);
console.log("Успішність:", isPassed);
console.log("Змінна any:", customPayload);

// 2. Оголошення масивів рядків і чисел
const technologies: string[] = ["TypeScript", "JavaScript", "HTML", "CSS"];
const practicalGrades: number[] = [10, 12, 11, 12];

console.log("Технології:", technologies);
console.log("Бали за завдання:", practicalGrades);