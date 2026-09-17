// 1. Інтерфейс поведінки тварини з обов'язковими та опціональними полями
interface Animal {
    name: string;
    age: number;
    speed: number;
    isDomestic?: boolean; // Опціональне: актуально для домашніх улюбленців
    wingSpan?: number;    // Опціональне: має сенс лише для тих, хто літає
    move(): void;
    makeSound(): void;
}

// 2. Клас Cat
class Cat implements Animal {
    constructor(
        public name: string,
        public age: number,
        public speed: number,
        public isDomestic: boolean = true
    ) {}

    move(): void {
        console.log(`${this.name} біжить на лапах зі швидкістю ${this.speed} км/год.`);
    }

    makeSound(): void {
        console.log(`${this.name} муркоче: Мяу!`);
    }
}

// 3. Клас Bird
class Bird implements Animal {
    constructor(
        public name: string,
        public age: number,
        public speed: number,
        public wingSpan: number
    ) {}

    move(): void {
        console.log(`${this.name} летить у небі з розмахом крил ${this.wingSpan} см зі швидкістю ${this.speed} км/год.`);
    }

    makeSound(): void {
        console.log(`${this.name} співає: Цвірінь-цвірінь!`);
    }
}

// 4. Клас Fish
class Fish implements Animal {
    constructor(
        public name: string,
        public age: number,
        public speed: number
    ) {}

    move(): void {
        console.log(`${this.name} пливе у воді зі швидкістю ${this.speed} км/год.`);
    }

    makeSound(): void {
        console.log(`${this.name} пускає бульбашки під водою.`);
    }
}

// Демонстрація поліморфізму через інтерфейс
const pets: Animal[] = [
    new Cat("Мурчик", 2, 15, true),
    new Bird("Кеша", 1, 30, 22),
    new Fish("Немо", 1, 8),
];

console.log("=== Інформація про тварин ===");
pets.forEach((animal) => {
    console.log(`\nТварина: ${animal.name} (вік: ${animal.age} р.)`);
    animal.move();
    animal.makeSound();
});