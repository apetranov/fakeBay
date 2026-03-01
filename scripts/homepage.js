async function fetchProducts() {
    try {
        const response = await fetch(
            'https://dummyjson.com/products'
        );
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.log('Error: ', error);
    }
}

const featuredProductsDiv = document
    .querySelector('.featured-products');

// Append products to featured products div

async function init() {
    const products = await fetchProducts();
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productTitle = document.createElement('h1');
        productTitle.textContent = product.title;

        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;

        const productPrice = document.createElement('h2');
        productPrice.textContent = `$${product.price}`;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);

        featuredProductsDiv.appendChild(productDiv);
    })
}

init();

const searchBox = document.querySelector('input');
const searchButton = document.querySelector('.search-button');

async function fetchProductsBySearch(keyword) {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${keyword}`
        )

        const data = await response.json();
        return data.products;
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function init2(keyword) {
    const products = await fetchProductsBySearch(keyword);
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productTitle = document.createElement('h1');
        productTitle.textContent = product.title;

        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;

        const productPrice = document.createElement('h2');
        productPrice.textContent = `$${product.price}`;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);

        featuredProductsDiv.appendChild(productDiv);
    })
}

searchButton.addEventListener('click', () => {
    console.log("Search button pressed");
    featuredProductsDiv.innerHTML = '';
    init2(searchBox.value);
})