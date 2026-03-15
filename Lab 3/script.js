function task1() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
        sum += i;
        i++;
    }
    console.log("Завдання 1: Сума перших 50 чисел =", sum);
}
function task2(n) {
    let factorial = 1;
    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }
    console.log(`Завдання 2: Факторіал числа ${n} =`, factorial);
}
function task3(monthNumber) {
    let monthName;
    switch (monthNumber) {
        case 1: monthName = "Січень"; break;
        case 2: monthName = "Лютий"; break;
        case 3: monthName = "Березень"; break;
        case 4: monthName = "Квітень"; break;
        case 5: monthName = "Травень"; break;
        case 6: monthName = "Червень"; break;
        case 7: monthName = "Липень"; break;
        case 8: monthName = "Серпень"; break;
        case 9: monthName = "Вересень"; break;
        case 10: monthName = "Жовтень"; break;
        case 11: monthName = "Листопад"; break;
        case 12: monthName = "Грудень"; break;
        default: monthName = "Невірний номер місяця";
    }
    console.log(`Завдання 3: Місяць №${monthNumber} — це ${monthName}`);
}
function task4(numbers) {
    let sum = 0;
    for (let num of numbers) {
        if (num % 2 === 0) {
            sum += num;
        }
    }
    console.log("Завдання 4: Сума парних чисел у масиві =", sum);
}
const task5 = (str) => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯaeiouAEIOU";
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    console.log(`Завдання 5: Кількість голосних у рядку "${str}" =`, count);
};
function task6(base, exponent) {
    let result = Math.pow(base, exponent);
    console.log(`Завдання 6: ${base} у степені ${exponent} =`, result);
}


task1();
task2(5);
task3(3);
task4([1, 2, 3, 4, 5, 6]);
task5("Привіт, як справи?");
task6(2, 3);