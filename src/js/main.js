const linkProduct = document.querySelector(".nav-menu__link-product");
const accordeonList = document.querySelector(".nav-menu__accordeon-list");
const iconProduct = document.querySelector(".nav-menu__product-icon");
const inputCountry = document.querySelector(".filter__input-country");
const listCountry = document.querySelector(".filter__country-list");
const itemCountry = document.querySelectorAll(".filter__country-item");
const inputDate = document.querySelectorAll(".filter__date-input");

// Клик на "Продукты"
linkProduct.addEventListener("click", function () {
  listCountry.classList.remove("country-list--active");
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
  listCountry.classList.toggle("country-list--active");
});

// Клик на отдельные страны
itemCountry.forEach((item) => {
  item.addEventListener("click", function () {
    listCountry.classList.remove("country-list--active");
  });
});

// Клик на выбор даты в фильтре
inputDate.forEach((input) => {
  input.addEventListener("click", function () {
    accordeonList.classList.remove("accordeon-list--active");
    listCountry.classList.remove("country-list--active");
  });
});
