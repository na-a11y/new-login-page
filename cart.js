document.addEventListener('DOMContentLoaded', () => {
    const cartElement = document.getElementById('cart');
    const resetButton = document.getElementById('reset-cart');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const products = [
        {id: 1, name: 'Product 1', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1708668433_3948163.jpg?format=webp&w=480&dpr=1.3', price: 3299 },
        {id: 2,  name: 'Product 2', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718188222_2574859.jpg?format=webp&w=480&dpr=1.3', price: 1999 },
        {id:3, name: 'Product 3', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712312699_8681562.jpg?format=webp&w=480&dpr=1.3', price: 2499 },
        {id:4, name: 'Product 4', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696401427_1028066.jpg?format=webp&w=480&dpr=1.3', price: 2999 },
        {id:5, name: 'Product 5', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1720850937_1050906.jpg?format=webp&w=480&dpr=1.3', price: 2699 },
        {id:6, name: 'Product 6', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415065_9369165.gif?format=webp&w=480&dpr=1.3', price: 2499 },
    ];


    function saveCart() {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartElement.innerHTML = '';
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Your cart is empty.</p>';
            totalQuantityElement.textContent = '0';
            totalPriceElement.textContent = '0.00';
            return;
        }

        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const productElement = document.createElement('div');
                productElement.className = 'cart-item';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <span>${product.name} - Quantity: ${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                `;
                cartElement.appendChild(productElement);

                totalQuantity += item.quantity;
                totalPrice += item.quantity * product.price;
            }
        });

        totalQuantityElement.textContent = totalQuantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function increaseQuantity(productId) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity++;
            saveCart();
            renderCart();
        }
    }

    function decreaseQuantity(productId) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity--;
            if (product.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            saveCart();
            renderCart();
        }
    }

    cartElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-quantity')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            increaseQuantity(productId);
        }
        if (event.target.classList.contains('decrease-quantity')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            decreaseQuantity(productId);
        }
    });

    resetButton.addEventListener('click', () => {
        cart = [];
        saveCart();
        renderCart();
    });

    renderCart();
});
