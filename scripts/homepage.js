async function fetchProducts() {
    try {
        const response = await fetch(
            'https://dummyjson.com/products'
        );
        const data = await response.json();
        console.log(data.products);
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

