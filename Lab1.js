<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Лаб 1</title>
</head>
<body>

<span>Hello world!</span>

<br><br>

<button
        onmouseover="changeText('Злата')"
        onmouseout="changeText('Hello world!')">
    Наведіть сюди
</button>

<script src="script.js"></script>
</body>
</html>function changeText(newText) {
    let elements = document.getElementsByTagName('span');

    if (elements.length > 0) {
        elements[0].textContent = newText;
    }
}