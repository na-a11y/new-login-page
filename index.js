document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            sessionStorage.setItem('redirectTo', 'index.html');
            window.location.href = 'login.html';
            return;
        }

        const productId = this.parentElement.getAttribute('data-id');
        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const productIndex = cart.findIndex(item => item.id === parseInt(productId));
        if (productIndex === -1) {
            cart.push({ id: parseInt(productId), quantity: 1 });
        } else {
            cart[productIndex].quantity++;
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    });
});
