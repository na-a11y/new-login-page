document.addEventListener('DOMContentLoaded', () => {
    const productDetailElement = document.getElementById('product-detail');
    const addToCartButton = document.getElementById('add-to-cart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const products = [
        {id: 1, name: 'Product 1', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1708668433_3948163.jpg?format=webp&w=480&dpr=1.3', price: 3299 , description: 'its souled store best selling product.'},
        {id: 2,  name: 'Product 2', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718188222_2574859.jpg?format=webp&w=480&dpr=1.3', price: 1999 , description: 'its souled store best selling product.'},
        {id:3, name: 'Product 3', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712312699_8681562.jpg?format=webp&w=480&dpr=1.3', price: 2499 , description: 'its souled store best selling product'},
        {id:4, name: 'Product 4', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696401427_1028066.jpg?format=webp&w=480&dpr=1.3', price: 2999  , description: 'its souled store best selling product'},
        {id:5, name: 'Product 5', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1720850937_1050906.jpg?format=webp&w=480&dpr=1.3', price: 2699  , description: 'its souled store best selling product'},
        {id:6, name: 'Product 6', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415065_9369165.gif?format=webp&w=480&dpr=1.3', price: 2499  , description: 'its souled store best selling product'}
    ];
    const product = products.find(p => p.id === productId);

    if (product) {
        productDetailElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
        `;
    } else {
        productDetailElement.innerHTML = '<p>Product not found.</p>';
        addToCartButton.style.display = 'none';
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart() {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        saveCart();
        window.location.href = 'cart.html'; // Navigate to cart page
    }

    addToCartButton.addEventListener('click', addToCart);
});
