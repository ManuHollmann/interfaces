/*/menu hamburguesa/;*/

let line1 = document.querySelector(".line1__bars-menu");
let line2 = document.querySelector(".line2__bars-menu");
let line3 = document.querySelector(".line3__bars-menu");
document.querySelector(".bars__menu").addEventListener("click", animateMenu);
document.querySelectorAll("menu__item--show").forEach((x) => {
  x.addEventListener();
});

function animateMenu() {
  line1.classList.toggle("activeline1__bars-menu");
  line2.classList.toggle("activeline2__bars-menu");
  line3.classList.toggle("activeline3__bars-menu");
  let shows = document.querySelectorAll(".nav-show");
  shows.forEach((show) => {
    show.classList.toggle("active-container-menu");
  });
}
