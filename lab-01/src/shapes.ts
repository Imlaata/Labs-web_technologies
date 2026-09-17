// 1. Інтерфейс геометричної фігури
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void;
}

// 2. Клас Коло
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    scale(factor: number): void {
        if (factor <= 0) throw new Error("Коефіцієнт масштабування має бути більше 0");
        this.radius *= factor;
    }

    getRadius(): number {
        return this.radius;
    }
}

// 3. Клас Прямокутник
class Rectangle implements Shape {
    constructor(
        private width: number,
        private height: number
    ) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    scale(factor: number): void {
        if (factor <= 0) throw new Error("Коефіцієнт масштабування має бути більше 0");
        this.width *= factor;
        this.height *= factor;
    }
}

// 4. Клас Трикутник (розрахунок площі за формулою Герона)
class Triangle implements Shape {
    constructor(
        private a: number,
        private b: number,
        private c: number
    ) {}

    getPerimeter(): number {
        return this.a + this.b + this.c;
    }

    getArea(): number {
        const s = this.getPerimeter() / 2; // півпериметр
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    scale(factor: number): void {
        if (factor <= 0) throw new Error("Коефіцієнт масштабування має бути більше 0");
        this.a *= factor;
        this.b *= factor;
        this.c *= factor;
    }
}

// 5. Масив об'єктів типу Shape та підрахунок сумарних значень
const figures: Shape[] = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5),
];

console.log("=== Початкові розміри фігур ===");
const totalAreaBefore = figures.reduce((sum, item) => sum + item.getArea(), 0);
const totalPerimeterBefore = figures.reduce((sum, item) => sum + item.getPerimeter(), 0);

console.log(`Загальна площа: ${totalAreaBefore.toFixed(2)} кв. од.`);
console.log(`Загальний периметр: ${totalPerimeterBefore.toFixed(2)} од.`);

// 6. Масштабування всіх фігур удвічі (x2)
console.log("\n=== Після масштабування з коефіцієнтом x2 ===");
figures.forEach((figure) => figure.scale(2));

const totalAreaAfter = figures.reduce((sum, item) => sum + item.getArea(), 0);
const totalPerimeterAfter = figures.reduce((sum, item) => sum + item.getPerimeter(), 0);

console.log(`Нова загальна площа: ${totalAreaAfter.toFixed(2)} кв. од.`);
console.log(`Новий загальний периметр: ${totalPerimeterAfter.toFixed(2)} од.`);