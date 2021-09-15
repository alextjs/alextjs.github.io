let fruits = [
    {id: 1, title: 'Apple', price: 20, img: '' },
    {id: 2, title: 'Orange', price: 30, img: ''},
    {id: 3, title: 'Mango', price: 40, img: ''}
]

const toHTML = fruit => `
                <div class="card" style="width: 18rem;">
                    <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
                    </div>
                </div>

`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal( {
    title: 'Цена на Товар',
    closable: true,
    content: ``,
    width: '200px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
                console.log('Primary btn clicked')
                priceModal.close()
            }},
        {text: 'Cancel', type: 'danger', handler() {
                console.log('Danger btn clicked')
                priceModal.close()
            }}
    ]
})

document.addEventListener('click',event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)


    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm( {
            title: 'Are you sure?',
            content: `<p>You deleting fruit: <strong>${fruit.title}</strong></p>`
            }).then( () => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})



