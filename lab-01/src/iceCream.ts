import * as readline from "readline";

// Створюємо інтерфейс введення, що коректно працює з кирилицею у Windows
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Асинхронний аналог prompt для консолі
function prompt(questionText: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(questionText + " ", (answer) => {
            resolve(answer.trim());
        });
    });
}

type IceCreamSize = "маленький" | "великий";
type Topping = "шоколад" | "карамель" | "ягоди";

interface IceCreamOrder {
    size: IceCreamSize;
    toppings: Topping[];
    withMarshmallow: boolean;
}

const SIZE_PRICES: Record<IceCreamSize, number> = {
    маленький: 10,
    великий: 25,
};

const TOPPING_PRICES: Record<Topping, number> = {
    шоколад: 5,
    карамель: 6,
    ягоди: 10,
};

const MARSHMALLOW_PRICE = 5;

function calculateIceCreamCost(order: IceCreamOrder): number {
    if (order.toppings.length === 0) {
        throw new Error("Потрібно обрати щонайменше одну начинку!");
    }

    let total = SIZE_PRICES[order.size];

    for (const topping of order.toppings) {
        total += TOPPING_PRICES[topping];
    }

    if (order.withMarshmallow) {
        total += MARSHMALLOW_PRICE;
    }

    return total;
}

function parseTopping(input: string): Topping | null {
    const clean = input.toLowerCase();
    if (clean === "1" || clean.includes("шок")) return "шоколад";
    if (clean === "2" || clean.includes("кар")) return "карамель";
    if (clean === "3" || clean.includes("ягід") || clean.includes("ягод")) return "ягоди";
    return null;
}

async function processOrder(): Promise<void> {
    try {
        // 1. Розмір
        const sizeInput = (await prompt("Оберіть розмір стаканчика (1 - маленький [10 грн] / 2 - великий [25 грн]):")).toLowerCase();
        const size: IceCreamSize = (sizeInput === "2" || sizeInput.includes("вел")) ? "великий" : "маленький";

        // 2. Начинки
        const toppingsInput = await prompt("Оберіть начинки через кому (1 - шоколад, 2 - карамель, 3 - ягоди):");
        const rawItems = toppingsInput.split(",");

        const selectedToppings: Topping[] = [];
        for (const item of rawItems) {
            const parsed = parseTopping(item.trim());
            if (parsed && !selectedToppings.includes(parsed)) {
                selectedToppings.push(parsed);
            }
        }

        if (selectedToppings.length === 0) {
            console.log("Помилка: потрібно вказати щонайменше одну валідну начинку.");
            return;
        }

        // 3. Маршмелоу
        const marshmallowInput = (await prompt("Додати маршмелоу (+5 грн)? (так / ні):")).toLowerCase();
        const withMarshmallow = marshmallowInput === "так" || marshmallowInput === "1" || marshmallowInput === "+" || marshmallowInput === "yes";

        const order: IceCreamOrder = {
            size,
            toppings: selectedToppings,
            withMarshmallow,
        };

        const finalCost = calculateIceCreamCost(order);

        console.log("\n--- Ваш чек ---");
        console.log(`Розмір: ${order.size} (${SIZE_PRICES[order.size]} грн)`);
        console.log(`Начинки: ${order.toppings.join(", ")}`);
        console.log(`Маршмелоу: ${order.withMarshmallow ? "Так (+5 грн)" : "Ні"}`);
        console.log(`Підсумкова вартість: ${finalCost} грн\n`);
    } finally {
        rl.close();
    }
}

processOrder();