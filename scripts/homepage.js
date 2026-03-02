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

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-button');

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartBtn);

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

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-button');

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartBtn);

        featuredProductsDiv.appendChild(productDiv);
    })
}

async function fetchCategories() {
    try {
        const response = await fetch(`
            https://dummyjson.com/products/category-list
        `);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
    } 
}

const categoryDropdown = document.querySelector('.category-select');

async function categoriesInit() {
    const categories = await fetchCategories();

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    })
}

categoriesInit();

async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
        )
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function filterByCategoryInit(category) {
    const products = await fetchProductsByCategory(category);
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productTitle = document.createElement('h1');
        productTitle.textContent = product.title;

        const productImage = document.createElement('img');
        productImage.src = product.thumbnail;

        const productPrice = document.createElement('h2');
        productPrice.textContent = `$${product.price}`;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('add-to-cart-button');

        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(addToCartBtn);

        featuredProductsDiv.appendChild(productDiv);
    })
}

// filterByCategoryInit('smartphones');

searchButton.addEventListener('click', async () => {
    featuredProductsDiv.innerHTML = '';

    const keyword = searchBox.value.trim();
    const category = categoryDropdown.value;

    if (keyword) {
        await init2(keyword);
    } else if (category) {
        await filterByCategoryInit(category);
    } else {
        await init(); // show default products again
    }
});

const fakebayLogo = document.querySelector('.fakebay-logo');

fakebayLogo.addEventListener("click", () => {
    featuredProductsDiv.innerHTML = '';
    init();
})