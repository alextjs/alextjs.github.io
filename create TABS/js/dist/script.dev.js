"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  // Tabs
  var tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(function (item) {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(function (item) {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach(function (item, i) {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Timer

  var deadline = '2021-05-30';

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      var t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // Modal

  var modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');
  modalTrigger.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  function openModal() {
    modal.classList.add('show'), modal.classList.remove('hide'), document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hide'), modal.classList.remove('show'), document.body.style.overflow = '';
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  var modalTimerId = setTimeout(openModal, 50000);
  showModalByScroll();

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll(1));
    }
  }

  window.addEventListener('scroll', showModalByScroll); // Использоваем классы для карточек.

  var MenuCard =
  /*#__PURE__*/
  function () {
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    _createClass(MenuCard, [{
      key: "changeToUAH",
      value: function changeToUAH() {
        this.price = this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var element = document.createElement('div');

        if (this.classes.length === 0) {
          this.classes = "menu__item";
          element.classList.add(this.classes);
        } else {
          this.classes.forEach(function (className) {
            return element.classList.add(className);
          });
        }

        element.innerHTML = "\n                    <img src=".concat(this.src, " alt=").concat(this.alt, ">\n                    <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n                    <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n                    <div class=\"menu__item-divider\"></div>\n                    <div class=\"menu__item-price\">\n                        <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n                        <div class=\"menu__item-total\"><span>").concat(this.price, "</span> \u0433\u0440\u043D/\u0434\u0435\u043D\u044C</div>\n                    </div>\n                ");
        this.parent.append(element);
      }
    }]);

    return MenuCard;
  }();

  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu .container").render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 14, ".menu .container").render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 21, ".menu .container").render(); // Forms

  var forms = document.querySelectorAll('form');
  var message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся обязательно',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(function (item) {
    bindPostData(item);
  });

  var postData = function postData(url, data) {
    var res;
    return regeneratorRuntime.async(function postData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(fetch(url, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: data
            }));

          case 2:
            res = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  function bindPostData(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = "\n                display: block;\n                margin: 0 auto;\n                ";
      form.insertAdjacentElement('afterend', statusMessage);
      var request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json');
      var formData = new FormData(form);
      var json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', JSON.stringify(json)).then(function (data) {
        console.log(data);
        showThanksModal(message.succes);
        statusMessage.remove();
      })["catch"](function () {
        showThanksModal(message.failure);
      })["finally"](function () {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    var prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    var thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = "\n             <div class = \"modal__content\">\n                <div class = \"modal__close\" data-close>\xD7</div>\n                <div class = \"modal__title\">".concat(message, "</div>\n             </div>\n            ");
    document.querySelector('.modal').append(thanksModal);
    setTimeout(function () {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  fetch('http://localhost:3000/menu').then(function (data) {
    return data.json();
  }).then(function (res) {
    return console.log(res);
  });
});