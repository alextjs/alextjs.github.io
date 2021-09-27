
const btns = document.querySelectorAll('.feature__link')
const lists = document.querySelectorAll('.feature-sub')

btns.forEach( (btnItem,index) => {
    btnItem.addEventListener('click', () => {

        btns.forEach((btnItem) => {
            btnItem.classList.remove('feature__link_active')
        })

        btnItem.classList.add('feature__link_active')

        lists.forEach(listItem => {
            listItem.classList.add('hidden')
    })
        lists[index].classList.remove('hidden')

    })

})
