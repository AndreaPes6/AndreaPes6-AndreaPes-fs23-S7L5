const CRUDAZON_URL = "https://striveschool-api.herokuapp.com/api/product/";
const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmZiNjJjNmEwZDAwMTg0OTVlODYiLCJpYXQiOjE3MDIxMjk1OTQsImV4cCI6MTcwMzMzOTE5NH0.kzIegHKEi1w3E41a1360g-VPrkLY4kxE0eYdb0Nj8rE"
const hideSpinner = () => document.getElementById('spinner').classList.add('d-none')
const createElement = (tag, className, innerHTML) => {
    const element = document.createElement(tag)
    element.className = className
    element.innerHTML = innerHTML
    return element
}
const createProductCard = (product) => createElement(
'div', 'col my-1 m-2', `
     <div class="card" id="realCard">
        <img src="${product.imageUrl}" class="img-fluid m-3" alt="${product.name}">
        <div class="card-body">
        <hr>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text fs-4 fw-medium">${product.brand}</p>
            <p class="card-text fs-5">€${product.price}</p>
            <p class="card-text d-flex justify-content-between">
                <a href="backoffice.html?productID=${product._id}" class="btn btn-secondary">modifica</a>
                <a href="details.html?productID=${product._id}" class="btn btn-info"><i></i>info</a>
            </p>
        </div>
    </div>
</div>`
)
const displayProducts = (results) => {
    const rowReference = document.getElementById('row')
    results.forEach(product => rowReference.appendChild(createProductCard(product)))
}
const getProducts = async () => {
    try {
        const response = await fetch(CRUDAZON_URL, { headers: { Authorization: authToken } })
        if (response.ok) {
            console.log('Connessione avvenuta! Status code:', response.status)
            const results = await response.json()
            console.log('Hai ottenuto: ', results)
            hideSpinner()
            displayProducts(results)
        } else {
            throw new Error('Errore nella gestione della chiamata')
        }
    } catch (error) {
        console.error(error)
    }
}
getProducts()