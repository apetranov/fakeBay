import { 
    getCart, 
    checkoutCart, 
    showTotalCartItems,
    getCartItemsTotalPrice,
    removeFromCart
} from './cart.js';

const cartItemsDiv = document.querySelector('.cart-items');
const checkoutButton = document.querySelector('.checkout-button');
const spanElement = document.querySelector('.total-items');
const cartTotalPriceSpan = document.querySelector('.total-price')

spanElement.textContent = showTotalCartItems();
cartTotalPriceSpan.textContent = getCartItemsTotalPrice();

function renderCart() {
    const cart = getCart();

    cartItemsDiv.innerHTML = '';

    spanElement.textContent = showTotalCartItems();
    cartTotalPriceSpan.textContent = getCartItemsTotalPrice();

    cart.forEach(item => {
        const div = document.createElement('div');

        div.innerHTML = `
            <img src="${item.thumbnail}" />
            <h2>${item.title}</h2>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${item.price * item.quantity}</p>
            <button class="remove-from-cart-button">Remove from Cart</button>
        `;

        const removeButton = div.querySelector('.remove-from-cart-button');

        removeButton.addEventListener('click', () => {
            removeFromCart(item.id);
            renderCart();
        });

        cartItemsDiv.appendChild(div);
    });
}

renderCart();


checkoutButton.addEventListener('click', () => {
    checkoutCart();
    renderCart();
})