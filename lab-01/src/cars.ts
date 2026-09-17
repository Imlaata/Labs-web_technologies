// 1. Абстрактний батьківський клас з модифікаторами доступу
abstract class Car {
    public readonly brand: string; // public: доступний звідусіль
    protected year: number;        // protected: доступний у цьому класі та класах-нащадках
    private vinCode: string;       // private: інкапсульований, доступний лише в Car

    constructor(brand: string, year: number, vinCode: string) {
        this.brand = brand;
        this.year = year;
        this.vinCode = vinCode;
    }

    // Метод для надання безпечного доступу нащадкам до private-поля
    protected getVinCode(): string {
        return this.vinCode;
    }

    // Абстрактний метод для реалізації в кожному конкретному бренді
    abstract displayInfo(): void;
}

// 2. Похідний клас 1: BMW
class BMW extends Car {
    public model: string;
    private hasMPackage: boolean; // Специфічна закрита характеристика бренду

    constructor(model: string, year: number, vinCode: string, hasMPackage: boolean) {
        super("BMW", year, vinCode); // Виклик конструктора батьківського класу
        this.model = model;
        this.hasMPackage = hasMPackage;
    }

    public displayInfo(): void {
        console.log(
            `[BMW] Модель: ${this.model} | Рік: ${this.year} | M-Package: ${this.hasMPackage ? "Так" : "Ні"} | VIN: ${this.getVinCode()}`
        );
    }
}

// 3. Похідний клас 2: Audi
class Audi extends Car {
    public model: string;
    private hasQuattroDrive: boolean; // Специфічний повний привід Audi

    constructor(model: string, year: number, vinCode: string, hasQuattroDrive: boolean) {
        super("Audi", year, vinCode);
        this.model = model;
        this.hasQuattroDrive = hasQuattroDrive;
    }

    public displayInfo(): void {
        console.log(
            `[Audi] Модель: ${this.model} | Рік: ${this.year} | Quattro Drive: ${this.hasQuattroDrive ? "Так" : "Ні"} | VIN: ${this.getVinCode()}`
        );
    }
}

// 4. Похідний клас 3: Toyota
class Toyota extends Car {
    public model: string;
    private isHybridEngine: boolean; // Фірмова гібридна установка

    constructor(model: string, year: number, vinCode: string, isHybridEngine: boolean) {
        super("Toyota", year, vinCode);
        this.model = model;
        this.isHybridEngine = isHybridEngine;
    }

    public displayInfo(): void {
        console.log(
            `[Toyota] Модель: ${this.model} | Рік: ${this.year} | Гібрид: ${this.isHybridEngine ? "Так" : "Ні"} | VIN: ${this.getVinCode()}`
        );
    }
}

// 5. Створення мінімум по 2 екземпляри кожного класу (разом 6 автомобілів)
const fleet: Car[] = [
    new BMW("M5 Competition", 2022, "WBA11111BMW", true),
    new BMW("X5 xDrive30d", 2021, "WBA22222BMW", false),

    new Audi("RS6 Avant", 2023, "WAU33333AUDI", true),
    new Audi("A4 Sedan", 2020, "WAU44444AUDI", false),

    new Toyota("Camry", 2023, "JTE55555TOYOTA", true),
    new Toyota("RAV4", 2024, "JTE66666TOYOTA", true),
];

console.log("=== Автопарк автомобілів ===");
fleet.forEach((car) => car.displayInfo());