const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//get id from url query parameter
const url = new URL(window.location.href)
const searchParams = url.searchParams
const id = parseInt(searchParams.get('id'))

getProduct() //get product through url
    .then(product => {
        console.llg
        renderProduct(product) //render product bying information
        renderRating(product) //render product rating
    })

function getProduct() {
    return sendRequest('get', `https://dummyjson.com/products/${id}`) //get product json by id
        .then(result => result)
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
                    } catch (error) {
                        reject('Invalid JSON format.')
                    }
                } else {
                    resolve(xhr.responseText)
                }
            }
        }
        xhr.onerror = () => reject('Network error')
    })
}

//render product bying information
function renderProduct(product) {
    console.log(product)

    //product image
    const image = $('.product-image')
    image.src = product.thumbnail

    //product title
    const title = $('.product-title')
    title.textContent = product.title

    //product rating star overal
    const ratingOveral = $('.product-rating__star-overal')
    ratingOveral.textContent = (product.rating).toFixed(1)

    //display star
    const starDisplay = $('.product-rating__star-icon-display')
    starDisplay.style.width = `${product.rating / 5 * 100}%`
    
    //product rating bout
    const ratingBout = $('.product-rating__rate-bout')
    ratingBout.textContent = product.reviews.length

    //product final price
    const finalPrice = $('.product-price__final-price')
    finalPrice.textContent = '$' + product.price

    //product original price
    const originalPrice = $('.product-price__original-price')
    originalPrice.textContent = '$' + (product.price / (1 - (product.discountPercentage / 100))).toFixed(2)

    //product discount percent
    const discountPercent = $('.product-price__discount-percent')
    discountPercent.textContent = product.discountPercentage + '%'

    //product brand
    const brand = $('.product-brand__info')
    brand.textContent = product.brand

    //product category
    const category = $('.product-category__info')
    category.textContent = product.category

    //product shipping
    const shipping = $('.product-shipping__info')
    shipping.textContent = product.shipping

    //product warrantly
    const warrantly = $('.product-warantly__info')
    warrantly.textContent = product.warrantyInformation

    //product description
    const description = $('.product-description__info')
    description.textContent = product.description

    //product weight
    const weight = $('.product-weight__info')
    weight.textContent = product.weight

    //product stock
    const stock = $('.product-stock__info')
    stock.textContent = product.stock

}

function renderRating(product) {
    product.reviews.forEach(review => {
        const ratingList = $('.rating-list')
        const li = document.createElement('li')
        li.className = 'rating-item'

        li.innerHTML = `
            <div class="rating-user">
                <a href="#" class="rating-user__name">${review.reviewerName}</a>
                <p class="rating-user__email">${review.reviewerEmail}</p>
            </div>
            <div class="rating-star">
                ${(function() {
                    let starIcons = ''
                    for (let i = 0; i < Math.round(review.rating); i++) {
                        starIcons += '<i class="star-icon fa-solid fa-star"></i>'
                    }
                    return starIcons
                })()}
            </div>
            <p class="rating-date">${review.date}</p>
            <div class="rating-detail">
                <p class="rating-detail__comment">${review.comment}</p>
            </div>`

        ratingList.appendChild(li)
    })
}