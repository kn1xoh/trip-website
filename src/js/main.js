const linkProduct = document.querySelector(".nav-menu__link--product");
const accordeonList = document.querySelector(".nav-menu__accordeon-list");
const iconProduct = document.querySelector(".nav-menu__product-icon");
const inputCountry = document.querySelector(".filter__input-country");
const listCountry = document.querySelector(".filter__country-list");
const itemCountry = document.querySelectorAll(".filter__country-item");
const inputDate = document.querySelectorAll(".filter__date-input");
const persons = document.querySelector(".filter__persons-wrap");
const selectPersonIcon = document.querySelector(".filter__select-person-icon");
const personCalc = document.querySelector(".filter__person-calc");

// Клик на "Продукты"
linkProduct.addEventListener("click", function () {
  listCountry.classList.remove("country-list--active");
  personCalc.classList.remove("person-calc--active");
  accordeonList.classList.toggle("accordeon-list--active");
  if (accordeonList.classList.contains("accordeon-list--active")) {
    iconProduct.classList.add("product-icon--active");
  } else {
    iconProduct.classList.remove("product-icon--active");
  }
});

// Клик на "Куда едем?"
inputCountry.addEventListener("click", function () {
  accordeonList.classList.remove("accordeon-list--active");
  personCalc.classList.remove("person-calc--active");
  listCountry.classList.toggle("country-list--active");
});

// Клик на отдельные страны
itemCountry.forEach((item) => {
  item.addEventListener("click", function () {
    listCountry.classList.remove("country-list--active");
    inputCountry.value = this.textContent;
  });
});

// Клик на выбор даты в фильтре
inputDate.forEach((input) => {
  input.addEventListener("click", function () {
    accordeonList.classList.remove("accordeon-list--active");
    listCountry.classList.remove("country-list--active");
    personCalc.classList.remove("person-calc--active");
  });
});

// Отображение текущей даты в фильтре
function currentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const date = `${now.getDate()}`.padStart(2, 0);
  const currentInput = `${year}-${month}-${date}`;

  inputDate.forEach((date) => {
    date.value = currentInput;
  });
}

currentDate();

// Клик на "1 человек"
persons.addEventListener("click", function () {
  accordeonList.classList.remove("accordeon-list--active");
  listCountry.classList.remove("country-list--active");
  personCalc.classList.toggle("person-calc--active");
  if (personCalc.classList.contains("person-calc--active")) {
    selectPersonIcon.classList.add("select-person-icon--active");
  } else {
    selectPersonIcon.classList.remove("select-person-icon--active");
  }
});

// Клик на плюс во вкладке "1 человек"
const personNumber = document.querySelectorAll(".person-calc__number");

personNumber.forEach((item) => {
  item.nextElementSibling.addEventListener("click", function () {
    count = Number(this.previousElementSibling.textContent);
    this.previousElementSibling.textContent = count + 1;
    countTotalPersons();
  });
});

//Клик на минус во вкладке "1 человек"
const totalPersons = document.querySelector("#total-persons");

personNumber.forEach((item) => {
  item.previousElementSibling.addEventListener("click", function () {
    count = Number(this.nextElementSibling.textContent);
    if (count > 0 && Number(totalPersons.textContent) > 1) {
      this.nextElementSibling.textContent = count - 1;
    }
    countTotalPersons();
  });
});

// Подсчет общего количества человек
const labelPersons = document.querySelector("#label-persons");

function countTotalPersons() {
  let allPersons = 0;

  personNumber.forEach((num) => {
    allPersons += Number(num.textContent);
  });

  if (
    (allPersons % 10 == 2 || allPersons % 10 == 3 || allPersons % 10 == 4) &&
    Math.floor(allPersons / 10) != 1
  ) {
    labelPersons.textContent = " человека";
  } else {
    labelPersons.textContent = " человек";
  }
  totalPersons.textContent = allPersons;
}

// Слайдер
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");

let currSlide = 0;
const maxSlides = slides.length;

function createDots() {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <button class="slider-dots__dot" data-slide="${i}"></button>
    `
    );
  });
}
createDots();

function goToSlide(slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function activateDots(slide) {
  document.querySelectorAll(".slider-dots__dot").forEach(function (dot) {
    dot.classList.remove("dot--active");
  });
  document
    .querySelector(`.slider-dots__dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
}

goToSlide(0);
activateDots(0);

function nextSlide() {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDots(currSlide);
}

function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDots(currSlide);
}

// Следующий слайд при нажатии на точки
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});

// Следующий слайд через клавиатуру
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Бургер меню
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  burgerMenu.classList.toggle("burger-menu--active");
  burger.classList.toggle("burger--active");
  // Убирает прокрутку при расскрытом меню бургера
  if (burger.classList.contains("burger--active")) {
    document.querySelector("body").style.overflowY = "hidden";
  } else {
    document.querySelector("body").style.overflowY = "scroll";
  }
});

// Прозрачное меню в header
const nav = document.querySelector(".nav-menu");

function hover(e, opacity) {
  if (e.target.classList.contains("nav-menu__link")) {
    const link = e.target;
    const siblings = link
      .closest(".nav-menu")
      .querySelectorAll(".nav-menu__link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
}

nav.addEventListener("mouseover", hover.bind(0.5));

nav.addEventListener("mouseout", hover.bind(1));
