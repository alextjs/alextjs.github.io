'use strict'

const headerCityButton = document.querySelector('.header__city-button');


headerCityButton.textContent = localStorage.getItem('lomoda-location') || `Ваш город!`
 
headerCityButton.addEventListener('click' , () => {
    const city = prompt('Укажите ваш город!');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city)
});

// Blocking Scroll the window!!!


const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
    top: ${-window.scrollY}px;
    left: 0;
    height: 100vh;
    width: 100%;
    position: fixed;
    overflow: hidden;
    padding-right: ${widthScroll}px;
    `
};

const enableScroll = () => {
document.body.style.cssText = '';
window.scroll({
    top: document.body.dbScrollY,
});

};

// Modal window

const subheaderСart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartBtnClose = document.querySelector('.cart__btn-close');
const cartOverlayOpen = document.querySelector('.cart-overlay-open');

const modalCartOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
};

   
        // Get Data from Database

        const getData = async () => {
            const data = await fetch('db.json');

            if (data.ok) {
                return data.json()
            } else {
                throw new Error(`Данные небыли полученны ${data.status}, ${data.statusText}`);
            }
        };

        const getGoods = (callback) => {
            getData()
            .then( data => {
                callback(data);
            })
            .catch( err => {
                console.log(err);
            })

        };


        // Modal window

        subheaderСart.addEventListener('click',modalCartOpen);

        cartOverlay.addEventListener('click', event => {
            if (event.target == cartBtnClose || event.target.matches('.cart-overlay-open')) {
                cartModalClose();
            };
            enableScroll();
        });

        document.addEventListener('keydown', event => {
            if (event.code === 'Escape') {
                cartModalClose();
            };
        });

        try {
            const goodsList = document.querySelector('.goods__list');

            if (!goodsList) {
                throw 'This is not a goods page'
            }

            const createCard = data => {
                const li = document.createElement('li');

                li.classList.add('goods__item');

            li.innerHTML = `
            <article class="good">
                            <a class="good__link-img" href="card-good.html#id56454">
                                <img class="good__img" src="goods-image/AD002EMLUEA8_14164246_1_v1.jpg" alt="">
                            </a>
                            <div class="good__description">
                                <p class="good__price">2890 &#8381;</p>
                                <h3 class="good__title">Eazyway <span class="good__title__grey">/ Тайтсы</span></h3>
                                <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">40 42 44 46</span></p>
                                <a class="good__link" href="card-good.html#id56454">Подробнее</a>
                            </div>
                        </article>
            `;

            return li;
};

            const renderGoodsList = data => {
                goodsList.textContent = '';

                // for (let i = 0; i < data.length; i++) 

                data.forEach(item => {
                    const card = createCard(item);
                    goodsList.append(card);
                })
                
            };
         getGoods(renderGoodsList);
        
} catch (err) {
            console.warn(err);
        };