const linkProduct = document.querySelector(".nav-menu__link-product");
const accordeonList = document.querySelector(".nav-menu__accordeon-list");
const iconProduct = document.querySelector(".nav-menu__product-icon");

linkProduct.addEventListener("click", function () {
  accordeonList.classList.toggle("active");
  if (accordeonList.classList.contains("active")) {
    iconProduct.classList.add("product-icon--active");
  } else {
    iconProduct.classList.remove("product-icon--active");
  }
});
