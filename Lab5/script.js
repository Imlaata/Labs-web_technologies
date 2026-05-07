//1
const bulb = document.getElementById('bulb');
const bulbTypeSelect = document.getElementById('bulbType');
let inactivityTimer;
const AUTO_OFF_MS = 5 * 60 * 1000;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        bulb.classList.remove('on');
    }, AUTO_OFF_MS);
}

function toggleBulb() {
    bulb.classList.toggle('on');
    resetInactivityTimer();
}

bulbTypeSelect.addEventListener('change', (e) => {
    bulb.classList.remove('standard', 'energy', 'led');
    bulb.classList.add(e.target.value);
    resetInactivityTimer();
});

function changeBrightness() {
    if (!bulb.classList.contains('on')) {
        alert("Спочатку увімкніть лампочку!");
        return;
    }
    let brightness = prompt("Введіть яскравість від 10 до 100:", "100");
    if (brightness !== null && Number(brightness) >= 10 && Number(brightness) <= 100) {
        bulb.style.opacity = String(Number(brightness) / 100);
        resetInactivityTimer();
    } else if (brightness !== null) {
        alert("Некоректне значення!");
    }
}

resetInactivityTimer();

//2
const lights = {
    red: document.getElementById('redLight'),
    yellow: document.getElementById('yellowLight'),
    green: document.getElementById('greenLight')
};
const statusText = document.getElementById('trafficStatus');

let trafficDurations = { red: 5000, yellow: 3000, green: 7000 };
let currentTrafficTimeout;
let isAutoMode = false;
let manualState = 0;

function setTrafficDurations() {
    let r = prompt("Час червоного (секунди):", String(trafficDurations.red / 1000));
    let y = prompt("Час жовтого (секунди):", String(trafficDurations.yellow / 1000));
    let g = prompt("Час зеленого (секунди):", String(trafficDurations.green / 1000));

    if (r && y && g) {
        trafficDurations = {
            red: Number(r) * 1000,
            yellow: Number(y) * 1000,
            green: Number(g) * 1000
        };
    }
}

function turnOffAllLights() {
    Object.values(lights).forEach(l => {
        l.classList.remove('active', 'blink');
    });
}

function setLightState(color, text, isBlinking = false) {
    turnOffAllLights();
    lights[color].classList.add('active');
    if (isBlinking) lights[color].classList.add('blink');
    statusText.innerText = `Стан: ${text}`;
}

function startTrafficLight() {
    isAutoMode = true;
    clearTimeout(currentTrafficTimeout);
    runRed();
}

function runRed() {
    if (!isAutoMode) return;
    setLightState('red', 'Червоний');
    currentTrafficTimeout = setTimeout(runYellowToGreen, trafficDurations.red);
}

function runYellowToGreen() {
    if (!isAutoMode) return;
    setLightState('yellow', 'Жовтий');
    currentTrafficTimeout = setTimeout(runGreen, trafficDurations.yellow);
}

function runGreen() {
    if (!isAutoMode) return;
    setLightState('green', 'Зелений');
    currentTrafficTimeout = setTimeout(runGreenBlink, trafficDurations.green);
}

function runGreenBlink() {
    if (!isAutoMode) return;
    setLightState('green', 'Миготливий зелений', true);
    currentTrafficTimeout = setTimeout(runYellowToRed, 3000);
}

function runYellowToRed() {
    if (!isAutoMode) return;
    setLightState('yellow', 'Жовтий');
    currentTrafficTimeout = setTimeout(runRed, trafficDurations.yellow);
}

function manualNextLight() {
    isAutoMode = false;
    clearTimeout(currentTrafficTimeout);

    if (manualState === 0) {
        setLightState('red', 'Червоний (Ручний)');
        manualState = 1;
    } else if (manualState === 1) {
        setLightState('yellow', 'Жовтий (Ручний)');
        manualState = 2;
    } else if (manualState === 2) {
        setLightState('green', 'Зелений (Ручний)');
        manualState = 3;
    } else if (manualState === 3) {
        setLightState('yellow', 'Жовтий (Ручний)');
        manualState = 0;
    }
}

//3
setInterval(() => {
    const now = new Date();
    let h = String(now.getHours()).padStart(2, '0');
    let m = String(now.getMinutes()).padStart(2, '0');
    let s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digitalClock').innerHTML = `${h}<span class="blink-colon">:</span>${m}<span class="blink-colon">:</span>${s}`;
}, 1000);

let countdownInterval;
function startTimer() {
    clearInterval(countdownInterval);
    const targetDate = new Date(document.getElementById('timerInput').value).getTime();

    if (isNaN(targetDate)) {
        alert("Виберіть дату та час!");
        return;
    }

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('timerDisplay').innerText = "Час вийшов!";
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timerDisplay').innerText = `Залишилось: ${days}д ${hours}г ${minutes}хв ${seconds}с`;
    }, 1000);
}

function calculateBirthday() {
    const birthdayInputValue = document.getElementById('birthdayInput').value;
    if (!birthdayInputValue) {
        alert("Виберіть дату народження!");
        return;
    }

    const birthday = new Date(birthdayInputValue);
    const now = new Date();

    birthday.setFullYear(now.getFullYear());
    if (now > birthday) {
        birthday.setFullYear(now.getFullYear() + 1);
    }

    const distance = birthday.getTime() - now.getTime();
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let months = Math.floor(days / 30);
    let remainingDays = days % 30;

    document.getElementById('birthdayDisplay').innerText = `До ДН: ~${months} місяців та ${remainingDays} днів!`;
}

//4
const catalog = new Map();
const uniqueNames = new Set();
const editHistory = new WeakMap();
const processedOrders = new WeakSet();

let productIdCounter = 1;
const logDiv = document.getElementById('storeLog');

function storeLog(message) {
    logDiv.innerHTML += `> ${message}\n`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

function uiAddProduct() {
    const name = document.getElementById('prodName').value.trim();
    const price = parseFloat(document.getElementById('prodPrice').value);
    const qty = parseInt(document.getElementById('prodQty').value);

    if (!name || isNaN(price) || isNaN(qty)) {
        alert("Заповніть всі поля коректно!");
        return;
    }
    if (uniqueNames.has(name)) {
        alert("Продукт з такою назвою вже існує!");
        return;
    }

    const product = { id: productIdCounter++, name, price, qty };

    catalog.set(product.id, product);
    uniqueNames.add(product.name);
    editHistory.set(product, [{ date: new Date(), action: 'Створено' }]);

    storeLog(`Додано: [ID:${product.id}] ${product.name} - ${product.price}₴ (${product.qty} шт)`);
}

function uiSearchProduct() {
    const searchName = document.getElementById('searchName').value.trim();
    let found = null;

    for (let prod of catalog.values()) {
        if (prod.name.toLowerCase() === searchName.toLowerCase()) {
            found = prod;
        }
    }

    if (found) {
        storeLog(`Знайдено: ${found.name}, Ціна: ${found.price}₴, На складі: ${found.qty}`);
    } else {
        storeLog(`Продукт "${searchName}" не знайдено.`);
    }
}

function uiOrderProduct() {
    const searchName = document.getElementById('searchName').value.trim();
    let targetProd = null;

    for (let prod of catalog.values()) {
        if (prod.name.toLowerCase() === searchName.toLowerCase()) {
            targetProd = prod;
        }
    }

    if (!targetProd) {
        storeLog("Немає такого товару для замовлення.");
        return;
    }

    if (targetProd.qty <= 0) {
        storeLog(`Товар ${targetProd.name} закінчився!`);
        return;
    }

    const order = { product: targetProd, date: new Date() };

    if (!processedOrders.has(order)) {
        targetProd.qty -= 1;
        processedOrders.add(order);

        let history = editHistory.get(targetProd);
        history.push({ date: new Date(), action: 'Продано 1 шт' });

        storeLog(`Замовлення успішне! ${targetProd.name} залишилось: ${targetProd.qty} шт.`);
    }
}