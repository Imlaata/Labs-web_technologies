//чисті функції
const generateId = (items) => items.length === 0 ? 1 : Math.max(...items.map(i => i.id)) + 1;

const createProduct = (id, name, price, category, image) => ({
    id, name, price: Number(price), category, image,
    createdAt: Date.now(), updatedAt: Date.now()
});

const addProduct = (items, newItem) => [...items, newItem];

const updateProduct = (items, updatedItem) =>
    items.map(item => item.id === updatedItem.id ? { ...updatedItem, updatedAt: Date.now() } : item);

const deleteProduct = (items, id) => items.filter(item => item.id !== id);

const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0);

const filterProducts = (items, category) =>
    category === 'all' ? items : items.filter(item => item.category === category);

const sortProducts = (items, sortType) => {
    const copy = [...items];
    switch (sortType) {
        case 'price': return copy.sort((a, b) => a.price - b.price);
        case 'created': return copy.sort((a, b) => a.createdAt - b.createdAt);
        case 'updated': return copy.sort((a, b) => b.updatedAt - a.updatedAt); // Спочатку найновіші оновлення
        default: return copy;
    }
};

const getProcessedProducts = (items, filterBy, sortBy) => {
    const filtered = filterProducts(items, filterBy);
    return sortProducts(filtered, sortBy);
};

//дані книг
let products = [
    createProduct(1, "Катабазис - Ребекка Кван", 805, "Фентезі", "img/1.jpg"),
    createProduct(2, "Захопити 13 - Хлої Волш", 590, "Романтика", "img/2.jpg"),
    createProduct(3, "Четверте крило (Емпіреї) - Ребекка Яррос", 850, "Фентезі", "img/3.jpg"),
    createProduct(4, "Веріті - Коллін Гувер", 570, "Трилер", "img/4.jpg"),
    createProduct(5, "Чотири вітри - Крістін Генна", 475, "Драматична проза", "img/5.jpg"),
    createProduct(6, "Вчена-ворон - М.А. Мут", 550, "Фентезі", "img/6.jpg"),
    createProduct(7, "Замерзла ріка - Аріель Лоухон", 525, "Трилер", "img/7.jpg"),
    createProduct(8, "Хроніки Буресвітла (комплект з 5 книг)", 3780, "Фентезі", "img/8.jpg")
];

products.forEach((p, index) => {
    p.createdAt = Date.now() - (100000 * index);
    p.updatedAt = p.createdAt;
});

let currentFilter = 'all';
let currentSort = 'none';
let editMode = false;

//робота з dom (side effects)
const grid = document.getElementById('productsGrid');
const emptyState = document.getElementById('emptyState');
const totalDisplay = document.getElementById('totalPriceDisplay');
const modal = document.getElementById('productModal');
const form = document.getElementById('productForm');
const toast = document.getElementById('toast');

const render = () => {
    grid.innerHTML = '';
    const visibleProducts = getProcessedProducts(products, currentFilter, currentSort);

    if (products.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';

        visibleProducts.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            //заглушка для зламаних посилань на картинку
            card.innerHTML = `
                <div class="image-wrapper">
                    <span class="badge-category">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80'">
                </div>
                <div>
                    <h3>${product.name}</h3>
                    <div class="id-text">Артикул: #${product.id}</div>
                    <div class="price">${product.price.toFixed(2)} ₴</div>
                    <div class="card-actions">
                        <button type="button" class="secondary-btn edit-btn" data-id="${product.id}">Редагувати</button>
                        <button type="button" class="danger-btn delete-btn" data-id="${product.id}">Видалити</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    totalDisplay.textContent = `Всього: ${calculateTotal(visibleProducts).toFixed(2)} ₴`;
};

const openModal = (isEdit = false, product = null) => {
    editMode = isEdit;
    document.getElementById('modalTitle').textContent = isEdit ? 'Редагувати книгу' : 'Додати книгу';

    if (isEdit && product) {
        document.getElementById('bookId').value = product.id;
        document.getElementById('bookName').value = product.name;
        document.getElementById('bookPrice').value = product.price;
        document.getElementById('bookCategory').value = product.category;
        document.getElementById('bookImage').value = product.image;
    } else {
        form.reset();
        document.getElementById('bookId').value = '';
    }
    modal.classList.add('active');
};

const closeModal = () => modal.classList.remove('active');

const showToast = (message) => {
    toast.textContent = `✨ ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
};

//обробники подфй
document.getElementById('addBtn').addEventListener('click', () => openModal(false));
document.getElementById('cancelBtn').addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
    e.preventDefault(); // запобігає перезавантаженню сторінки при відправці форми
    const idVal = document.getElementById('bookId').value;
    const name = document.getElementById('bookName').value.trim();
    const price = document.getElementById('bookPrice').value;
    const category = document.getElementById('bookCategory').value;
    let image = document.getElementById('bookImage').value.trim();

    if (editMode) {
        const oldProduct = products.find(p => p.id === Number(idVal));
        const updatedProduct = { ...oldProduct, name, price: Number(price), category, image };
        products = updateProduct(products, updatedProduct);
        showToast(`Оновлено: [ID ${updatedProduct.id}] ${updatedProduct.name}`);
    } else {
        const newId = generateId(products);
        const newProduct = createProduct(newId, name, price, category, image);
        products = addProduct(products, newProduct);
        showToast('Книгу успішно додано до каталогу!');
    }

    closeModal();
    render();
});

grid.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.product-card');
        card.classList.add('removing');

        setTimeout(() => {
            products = deleteProduct(products, id);
            showToast('Книгу видалено з магазину');
            render();
        }, 300);

    } else if (e.target.classList.contains('edit-btn')) {
        const productToEdit = products.find(p => p.id === id);
        openModal(true, productToEdit);
    }
});

document.getElementById('filterButtons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentFilter = e.target.dataset.category;
        render();
    }
});

document.getElementById('sortButtons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        currentSort = e.target.dataset.sort;
        render();
    }
});

render();