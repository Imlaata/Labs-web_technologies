// 1. Інтерфейс для виплати заробітної плати
interface Payable {
    pay(): void;
}

// 2. Абстрактний клас співробітника
abstract class Employee {
    constructor(
        public name: string,
        public age: number,
        public salary: number
    ) {}

    // Абстрактний метод: повертає розмір річного бонусу
    abstract getAnnualBonus(): number;
}

// 3. Клас Developer (бонус 10%)
class Developer extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.1; // 10% від ставки
    }

    pay(): void {
        const totalPayout = this.salary + this.getAnnualBonus();
        console.log(
            `[Developer] Виплата для ${this.name}: Зарплата = ${this.salary} грн, Річний бонус = ${this.getAnnualBonus()} грн. Разом: ${totalPayout} грн.`
        );
    }
}

// 4. Клас Manager (бонус 20%)
class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getAnnualBonus(): number {
        return this.salary * 0.2; // 20% від ставки
    }

    pay(): void {
        const totalPayout = this.salary + this.getAnnualBonus();
        console.log(
            `[Manager] Виплата для ${this.name}: Зарплата = ${this.salary} грн, Річний бонус = ${this.getAnnualBonus()} грн. Разом: ${totalPayout} грн.`
        );
    }
}

// 5. Масив об'єктів типу Employee (розробники та менеджери)
const staff: (Employee & Payable)[] = [
    new Developer("Злата", 20, 65000),
    new Developer("Максим", 25, 80000),
    new Developer("Ірина", 23, 72000),
    new Manager("Олександр", 32, 110000),
    new Manager("Тетяна", 38, 125000),
];

console.log("=== Проведення виплат співробітникам ===");
staff.forEach((employee) => employee.pay());

// 6. Розрахунок загальної суми річних бонусів для всіх працівників
const totalBonuses = staff.reduce((sum, employee) => sum + employee.getAnnualBonus(), 0);

console.log("\n=== Загальний річний бюджет на бонуси ===");
console.log(`Сума річних бонусів компанії: ${totalBonuses} грн`);