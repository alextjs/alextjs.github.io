/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
'use strict'; // Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', function () {
  var movieDB = {
    movies: ["Логан", "Лига справедливости", "Ла-ла лэнд", "Одержимость", "Скотт Пилигрим против..."]
  };
  var adv = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre'),
      view = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkbox = addForm.querySelector('[type="checkbox"]');
  addForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var newFilm = addInput.value;
    var favourite = checkbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = "".concat(newFilm.substring(0, 22), "...");
      }

      if (favourite) {
        console.log('Добавляем любимый фильм');
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, view);
    }

    ;
    event.target.reset();
  });

  var deleteAdv = function deleteAdv(arr) {
    arr.forEach(function (item) {
      item.remove();
    });
  };

  var makeChanges = function makeChanges() {
    genre.textContent = 'драма';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  var sortArr = function sortArr(arr) {
    arr.sort();
  };

  function createMovieList(films, parent) {
    sortArr(films);
    parent.innerHTML = "";
    films.forEach(function (item, i) {
      parent.innerHTML += "\n                <li class=\"promo__interactive-item\"> ".concat(i + 1, " ").concat(item, "\n                    <div class=\"delete\"></div>\n                </li>\n                \n                ");
    });
    document.querySelectorAll('.delete').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(movieDB.movies, view);
      });
    });
  }

  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, view);
});