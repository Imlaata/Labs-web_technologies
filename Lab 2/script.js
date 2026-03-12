//з1
function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) { max = arr[i]; }
        if (arr[i] < min) { min = arr[i]; }
    }
    document.getElementById('res-min-max').innerText = "Макс: " + max + ", Мін: " + min;
}

let book1 = { title: "Гаррі Поттер", genre: "Фентезі" };
let book2 = { title: "Гаррі Поттер", genre: "Фентезі" };

function compareBooks(b1, b2) {
    let result = (b1.title === b2.title && b1.genre === b2.genre);
    document.getElementById('res-compare-obj').innerText = "Книги однакові: " + result;
}

//з2
function checkRange(num) {
    let result = (num >= 10 && num <= 30);
    document.getElementById('res-range').innerText = result;
}

let myStatus = true;
let newStatus = !myStatus;
document.getElementById('res-not').innerText = "Було: " + myStatus + ", стало: " + newStatus;

//з3
function getGrade(score) {
    let grade;
    if (score >= 90) { grade = "Відмінно"; }
    else if (score >= 75) { grade = "Добре"; }
    else if (score >= 60) { grade = "Задовільно"; }
    else { grade = "Незадовільно"; }
    document.getElementById('res-grade').innerText = "Бали " + score + " — це " + grade;
}

function getSeasonIf(month) {
    let season;
    if (month === 12 || month <= 2) { season = "Зима"; }
    else if (month >= 3 && month <= 5) { season = "Весна"; }
    else if (month >= 6 && month <= 8) { season = "Літо"; }
    else { season = "Осінь"; }
    document.getElementById('res-season-if').innerText = "Для місяця " + month + " це " + season;
}

function getSeasonTernary(month) {
    let season = (month === 12 || month <= 2) ? "Зима" :
        (month >= 3 && month <= 5) ? "Весна" :
            (month >= 6 && month <= 8) ? "Літо" : "Осінь";
    document.getElementById('res-season-ternary').innerText = "Для місяця " + month + " це " + season;
}

findMinMax([15, 3, 99, 8, 21]);
compareBooks(book1, book2);
checkRange(25);
getGrade(85);
getSeasonIf(4);
getSeasonTernary(11);