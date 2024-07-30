document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const loginLogoutButton = document.getElementById('login-logout-button');
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    function updateCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalQuantity;
    }

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

    function addToCart(productId) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function logout(event) {
        event.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        isLoggedIn = false;
        updateLoginLogoutButton();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (!isLoggedIn) {
                window.location.href = 'login.html';
                return;
            }
            const productId = parseInt(event.target.parentElement.getAttribute('data-id'));
            addToCart(productId);
        });
    });

    updateCartCount();
    updateLoginLogoutButton();
});
