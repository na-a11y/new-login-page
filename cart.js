document.addEventListener('DOMContentLoaded', () => {
    const cartElement = document.getElementById('cart');
    const resetButton = document.getElementById('reset-cart');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');
    const loginLogoutButton = document.getElementById('login-logout-button');
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    const products = [
        { id: 1, name: 'Batman: The Dark Knight 2.0', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1708668433_3948163.jpg?format=webp&w=480&dpr=1.3', price: 3299 },
        { id: 2, name: 'Urban Blaze: Sangria', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718188222_2574859.jpg?format=webp&w=480&dpr=1.3', price: 1999 },
        { id: 3, name: 'Urban Blaze: Mocha', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712312699_8681562.jpg?format=webp&w=480&dpr=1.3', price: 2499 },
        { id: 4, name: 'Deadpool - Eyes on You', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696401427_1028066.jpg?format=webp&w=480&dpr=1.3', price: 2999 },
        { id: 5, name: 'Batman: Shadow Of The Knight', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1720850937_1050906.jpg?format=webp&w=480&dpr=1.3', price: 2699 },
        { id: 6, name: 'Marvel: Navy Blue', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415065_9369165.gif?format=webp&w=480&dpr=1.3', price: 2499 },
    ];

    function updateLoginLogoutButton() {
        if (isLoggedIn) {
            loginLogoutButton.textContent = 'Logout';
            loginLogoutButton.href = '#';
            loginLogoutButton.addEventListener('click', logout);
        } else {
            loginLogoutButton.textContent = 'Login';
            loginLogoutButton.href = 'login.html';
            loginLogoutButton.removeEventListener('click', logout);
        }
    }

    function logout(event) {
        event.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        isLoggedIn = false;
        updateLoginLogoutButton();
    }

    function renderCart() {
        cartElement.innerHTML = '';
        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                    <span class="quantity-controls">
                        <button class="dec-quantity" data-id="${item.id}">-</button>
                        Quantity: ${item.quantity}
                        <button class="inc-quantity" data-id="${item.id}">+</button>
                    </span>
                    <span>Price: ₹${product.price * item.quantity}</span>
                `;
                cartElement.appendChild(itemElement);

                totalQuantity += item.quantity;
                totalPrice += product.price * item.quantity;
            }
        });

        totalQuantityElement.textContent = totalQuantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Add event listeners for the increment and decrement buttons
        const incButtons = document.querySelectorAll('.inc-quantity');
        const decButtons = document.querySelectorAll('.dec-quantity');

        incButtons.forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                updateQuantity(productId, 1);
            });
        });

        decButtons.forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                updateQuantity(productId, -1);
            });
        });
    }

    function updateQuantity(productId, change) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity += change;
            if (product.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function resetCart() {
        cart = [];
        sessionStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    resetButton.addEventListener('click', resetCart);

    renderCart();
    updateLoginLogoutButton();
});
