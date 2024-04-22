const linkProduct = document.querySelector(".nav-menu__link-product");
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
  });
});

//Клик на минус во вкладке "1 человек"
personNumber.forEach((item) => {
  item.previousElementSibling.addEventListener("click", function () {
    count = Number(this.nextElementSibling.textContent);
    if (count > 0) {
      this.nextElementSibling.textContent = count - 1;
    }
  });
});
