const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmZiNjJjNmEwZDAwMTg0OTVlODYiLCJpYXQiOjE3MDIxMjk1OTQsImV4cCI6MTcwMzMzOTE5NH0.kzIegHKEi1w3E41a1360g-VPrkLY4kxE0eYdb0Nj8rE"
const getElement = (id) => document.getElementById(id)
const fetchProduct = async (method, data) => {
    try {
        const response = await fetch(`${API_URL}${new URLSearchParams(window.location.search).get('productID') || ''}`, {
            method,
            headers: { Authorization: API_KEY, 'Content-Type': 'application/json' },
            body: data && JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Errore nella gestione della chiamata')
        return response.json()
    } catch (error) {
        console.error(error)
    }
}
const deleteProduct = async () => {
    const response = await fetchProduct('DELETE');
    response ? alert('Prodotto eliminato') : alert('Non è stato possibile eliminare il prodotto');
    response && window.location.replace('cruzadon.html');
}
const updateFormFields = (product) => {
    ['name', 'description', 'brand', 'imageUrl', 'price'].forEach(field => {
        const element = getElement(field);
        element && product[field] !== undefined && (element.value = product[field])
    })
}
const exists = async () => {
    try {
        const product = await fetchProduct('GET');
        console.log('Il prodotto esiste!', product ? 'Status code: 200' : 'Status code: 404');
        if (product) {
            updateFormFields(product)
            getElement('delete').addEventListener('click', () => {
                window.confirm('Vuoi davvero eliminare il prodotto?') && deleteProduct() || alert('La cancellazione è stata eliminata')
            })
        }
    } catch (error) {
        console.error('Non è stato possibile verificare l\'esistenza del prodotto', error);
    }
}
const formReference = document.getElementById('form');
formReference.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const newProduct = ['name', 'description', 'brand', 'imageUrl', 'price']
        .reduce((acc, field) => ({ ...acc, [field]: getElement(field).value }), {})
    console.log('Prodotto che hai appena inserito:', newProduct);
    await fetchProduct(new URLSearchParams(window.location.search).get('productID') ? 'PUT' : 'POST', newProduct)
    !window.confirm('Prodotto aggiunto, vorresti aggiungere altri prodotti?') &&
        (alert('Verrai reindirizzato alla homepage.'), window.location.assign('cruzadon.html'));
})
exists()