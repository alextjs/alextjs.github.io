"use strict";

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
  });
});