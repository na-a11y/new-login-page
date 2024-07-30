document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(productId) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        saveCart();
    }

    products.forEach(product => {
        product.querySelector('.add-to-cart').addEventListener('click', () => {
            const productId = parseInt(product.getAttribute('data-id'));
            addToCart(productId);
            window.location.href = 'cart.html'; // Navigate to cart page
        });
    });
});
