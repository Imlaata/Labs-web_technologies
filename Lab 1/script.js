function changeText(newText) {
    let elements = document.getElementsByTagName('span');

    if (elements.length > 0) {
        elements[0].textContent = newText;
    }
}