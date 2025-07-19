getProducts()
    .then(products => {
        console.log(products)
        renderProducts(products)

        const allProducts = getAllProductsElement()
        allProducts.forEach(product => handleProductOnClick(product))
    })

function getProducts() {
    return sendRequest('get', 'https://dummyjson.com/products')
        .then(requestResult => requestResult.products)
        .catch(error => console.log(error))
}

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 400) {
                const contentType = xhr.getResponseHeader('content-type')
                const isJson = contentType && contentType.includes('application/json')
                if (isJson) {
                    try {
                        resolve(JSON.parse(xhr.responseText))
                    } catch {
                        reject('Invalid JSON format')
                    }
                } else if (!isJson) {
                    resolve(xhr.responseText)
                }
            }
        }
        xhr.onerror = () => reject('Network error')
    })
}

function renderProducts(products) {
    products.forEach(product => {
        const liItem = document.createElement('li')
        liItem.className = 'product-item'
        liItem.dataset.index = product.id

        liItem.innerHTML = `
            <img src="${product.thumbnail}" alt="" class="product-img">
            <div class="product-content">
                <h4 class="product-title">${product.title.length <= 30 ? product.title : product.title.slice(0, 30) + '...'}</h4>
                <p class="product-price">$${product.price}</p>
                <div class="product-star">
                    <div class="product-star__icon">
                        <div class="product-star__background">
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                        </div>
                        <div class="product-star__display" style="width: ${(product.rating / 5 * 100).toFixed(2)}%">
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                            <i class="star-icon fa-solid fa-star"></i>
                        </div>
                    </div>
                    <p class="product-star__point">${(product.rating).toFixed(1)}</p>
                </div>
                <p class="product-stock">In stock: ${product.stock}</p>
            </div>`

        const productList = document.querySelector('.product-list')
        productList.appendChild(liItem)

    })
}

function getAllProductsElement() {
    const allProducts = Array.from(document.querySelectorAll('.product-item'))
    return allProducts
}

function handleProductOnClick(product) {
    product.onclick = () => {
        const productId = product.dataset.index
        window.location.href = `../product/product.html?id=${productId}`;
    }
}