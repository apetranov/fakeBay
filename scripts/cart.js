// Get cart from localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
export function addToCart(product) {
    const cart = getCart();

    // Check if product already exists
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
}

// Remove product completely from cart
export function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

export function checkoutCart() {
    localStorage.removeItem('cart');
}

export function showTotalCartItems() {
    return getCart().length;
}

export function getCartItemsTotalPrice() {
    let totalPrice = 0;

    getCart().forEach(product => {
        totalPrice += product.price * product.quantity;
    })

    return `$${totalPrice.toFixed(2)}`;
}