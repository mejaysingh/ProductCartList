/*
Create a vanilla js application that consumes the 
https://fakestoreapi.com/carts/2 API and 
displays a list of products in the cart. For each product in the cart, 
the application should make an API call to fetch the product details using the ID 
returned in the cart API and display the product title, price, and image. 
Note: The https://fakestoreapi.com/products/:id: 
API returns details for a single product. 
You will need to make an API call for each product in the cart to fetch the product details.
*/

const CART_API_URL = "https://fakestoreapi.com/carts/2";
const PRODUCT_API_URL = "https://fakestoreapi.com/products/";

const containerEl = document.querySelector('#container');

document.addEventListener('DOMContentLoaded', async function(){
    try {
        const cart = await loadProduct(CART_API_URL);
        // console.log('cart items:',cart);
        const products = await fetchMultipleAPI(cart)
        // console.log('all products:',products);

        products.forEach(renderCard)
        
    } catch (error) {
        console.error(error.message);
    }
});

function renderCard(product){

    // console.log('single product:',product);
    const cardEl = document.createElement('div')
    const imgEl = document.createElement('img')
    const h2El = document.createElement('h2')
    const h3El = document.createElement('h3')

    cardEl.classList.add('card')
    imgEl.classList.add('image')
    imgEl.src = product.image

    h2El.textContent = product.title
    h3El.textContent = product.price

    cardEl.appendChild(imgEl)
    cardEl.appendChild(h2El)
    cardEl.appendChild(h3El)

    containerEl.appendChild(cardEl)
}

async function fetchMultipleAPI(cart){
    try {
        let response = []
        cart.products.forEach( (row) => {
            // response.push( await loadProduct(PRODUCT_API_URL + row.productId) )
            const result = loadProduct(PRODUCT_API_URL + row.productId)
            // console.log('result:',result);
            response.push(result)
        })

        const products = await Promise.all(response)

        return products

        // const products = await Promise.all(
        //     Array.from(cart.products).forEach( row => {
        //         loadProduct(PRODUCT_API_URL + row.productId)
        //     })
        // ) 

    } catch (error) {
        console.error(error.message);
    }
        
}

async function loadProduct(API_URL){
    try {
        const result = await fetch(API_URL);
        const response = await result.json()
        return response;
    } catch (error) {
        console.error(error.message)
    }
}


