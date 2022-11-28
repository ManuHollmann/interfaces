/*/menu hamburguesa/;*/

let menu = document
  .getElementById("hamburger")
  .addEventListener("click", animateMenu);
document.querySelectorAll("menu__item--show").forEach((x) => {
  x.addEventListener();
});

function animateMenu() {
  document.getElementById("hamburger").classList.toggle("active__bars-menu");
  let shows = document.querySelectorAll(".nav-show");
  shows.forEach((show) => {
    show.classList.toggle("active-container-menu");
  });
}
