'use strict';

var headerCityButton = document.querySelector('.header__city-button');
headerCityButton.textContent = localStorage.getItem('lomoda-location') || "\u0412\u0430\u0448 \u0433\u043E\u0440\u043E\u0434!";
headerCityButton.addEventListener('click', function () {
  var city = prompt('Укажите ваш город!');
  headerCityButton.textContent = city;
  localStorage.setItem('lomoda-location', city);
}); // Модальное окно

var subheaderСart = document.querySelector('.subheader__cart');
cartOverlay = document.querySelector('.cart-overlay');
subheaderСart.addEventListener('click', function () {
  cartOverlay.classList.add('cart-overlay-open');
});