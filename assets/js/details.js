const CRUDAZON_URL = "https://striveschool-api.herokuapp.com/api/product/"
const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmZiNjJjNmEwZDAwMTg0OTVlODYiLCJpYXQiOjE3MDIxMjk1OTQsImV4cCI6MTcwMzMzOTE5NH0.kzIegHKEi1w3E41a1360g-VPrkLY4kxE0eYdb0Nj8rE"
const getElement = (id) => document.getElementById(id)
const productDetail = async () => {
    const productId = new URLSearchParams(window.location.search).get('productID')
    if (!productId) return
    try {
        const response = await fetch(`${CRUDAZON_URL}${productId}`, {
            headers: { "Authorization": authToken }
        })
        if (!response.ok) throw new Error('Errore nella gestione della chiamata')
        const product = await response.json()
        getElement('productImage').innerHTML = `<img src="${product.imageUrl}" class="w-100 border border-black">`
        getElement('productInfo').innerHTML = `
            <h2>${product.brand} - ${product.name}</h2>
            <p>${product.description}</p>
            <p>Prezzo: €${product.price}</p>
            <p>Url immagine:<br>${product.imageUrl}</p>
            <h3>Generato dal server:</h3>
            <ul>
                <li>Creato il: ${product.createdAt}</li>
                <li>Aggiornato il: ${product.updatedAt}</li>
                <li>Id dell'utente: ${product.userId}</li>
                <li>v: ${product.__v}</li>
                <li>id: ${product._id}</li>
            </ul>`
    } catch (error) {
        console.error(error)
    }
}
productDetail()