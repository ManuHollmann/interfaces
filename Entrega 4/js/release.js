setTimeout(function () {
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("scroll", castRiseCarousels);
  window.addEventListener("scroll", castRiseHistory);
  checkScroll();
}, 2000);
/*5300*/

const slider = document.querySelectorAll(".slider-inner");
const progressBar = document.querySelectorAll(".prog-bar-inner");
let number = document.querySelector(".number");
/*
let num = 0;
let counter = setInterval(countLoad, 50, num);

function countLoad() {
  if (num === 100) {
    clearInterval(counter);
    document.querySelector(".circular").style.display = "none";
    document.querySelector(".container").style.display = "block";
  } else {
    num++;
    number.innerHTML = num + "<p>%</p>";
  }
}*/

let sliderGrabbed = false;

slider.forEach((x) => {
  x.parentElement.addEventListener("scroll", (e) => {
    progressBar.forEach((y) => {
      if (x.dataset.scroll == y.dataset.progres) {
        y.style.width = `${
          (x.parentElement.scrollLeft /
            (x.parentElement.scrollWidth - x.parentElement.clientWidth)) *
          100
        }%`;
      }
    });
  });
});

slider.forEach((x) => {
  x.addEventListener("mousedown", (e) => {
    sliderGrabbed = true;
    x.style.cursor = "grabbing";
  });
});

slider.forEach((x) => {
  x.addEventListener("mouseup", (e) => {
    sliderGrabbed = false;
    x.style.cursor = "grab";
  });
});

slider.forEach((x) => {
  x.addEventListener("mouseleave", (e) => {
    sliderGrabbed = false;
  });
});

slider.forEach((x) => {
  x.addEventListener("mousemove", (e) => {
    if (sliderGrabbed) {
      x.parentElement.scrollLeft -= e.movementX;
    }
  });
});

slider.forEach((x) => {
  x.addEventListener("wheel", (e) => {
    e.preventDefault();
    x.parentElement.scrollLeft += e.deltaY;
  });
});

function boundCards() {
  const container_rect = container.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();

  if (parseInt(cards.style.left) > 0) {
    cards.style.left = 0;
  } else if (cards_rect.right < container_rect.right) {
    cards.style.left = `-${cards_rect.width - container_rect.width}px`;
  }
}

function checkScroll() {
  let triggerBottom = (window.innerHeight / 5) * 4;
  let sectionA = document.getElementsByClassName("gameSectionA");
  let sectionB = document.getElementsByClassName("gameSectionB");

  for (b of sectionB) {
    let top = b.getBoundingClientRect().top;
    if (top < triggerBottom) {
      b.classList.add("show");
    }
  }
  for (a of sectionA) {
    let top = a.getBoundingClientRect().top;
    if (top < triggerBottom) {
      a.classList.add("show");
    }
  }
}
/*
===========================
* Parallax
===========================
*/
function castParallax() {
  window.addEventListener("scroll", function (event) {
    var top = this.pageYOffset;

    var character = document.getElementById("character-img");
    var speed, xPos;
    speed = character.getAttribute("data-speed");
    var xPos = -((top * speed) / 100);
    if (xPos > -1100) {
      character.setAttribute(
        "style",
        "transform: translate3d(" + xPos + "px, 0px, 0px)"
      );
    }

    var logo = document.getElementById("logo-hero");
    var speed, yPos;
    speed = logo.getAttribute("data-speed");

    var yPos = (top * speed) / 100;
    if (yPos < 586.56) {
      logo.setAttribute(
        "style",
        "transform: translate3d(0px, " + yPos + "px, 0px)"
      );
    }
    var distanceToTop = window.pageYOffset + logo.getBoundingClientRect().top;
    var elementHeight = logo.offsetHeight;
    var scrollTop = document.documentElement.scrollTop + 55;

    var opacity = 1;

    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop * 1.3 - distanceToTop) / elementHeight;
    }

    if (opacity >= 0) {
      logo.style.opacity = opacity;
    }
  });
}

var header = document.querySelector("header");
var logo = document.getElementById("nav-logo");
var hamburger = document.getElementById("hamburger");
var distanceToTop = window.pageYOffset + header.getBoundingClientRect().top;
var elementHeight = header.offsetHeight;
var scrollTop = document.documentElement.scrollTop + 55;

logo.style.width =
  (7 - (scrollTop * 1.3 - distanceToTop) / elementHeight) * 20 + "%";
hamburger.style.height =
  (7 - (scrollTop * 1.3 - distanceToTop) / elementHeight) * 30 + "%";

function castHeader() {
  window.addEventListener("scroll", function (event) {
    var header = document.querySelector("header");
    var logo = document.getElementById("nav-logo");
    var hamburger = document.getElementById("hamburger");
    var distanceToTop = window.pageYOffset + header.getBoundingClientRect().top;
    var elementHeight = header.offsetHeight;
    var scrollTop = document.documentElement.scrollTop + 55;

    var height = 7;

    if (scrollTop > distanceToTop) {
      height = 7 - (scrollTop * 1.3 - distanceToTop) / elementHeight;
    }

    if (height >= 2) {
      if (height >= 3.4) {
        header.style.height = height + 0.5 + "%";
      }
      if (height >= 5) {
        logo.style.width = height * 20 + "%";
        hamburger.style.height = height * 40 + "%";
        /*hamburger.style.width = (height * 2) / 5 + "%";*/
      }
    }
  });
}

document.body.onload = castParallax();

addEventListener("DOMContentLoaded", castHeader());

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

function castRiseCarousels() {
  let triggerBottom = (window.innerHeight / 5) * 4;
  let sectionA = document.getElementsByClassName("slider-wrap");

  for (a of sectionA) {
    let top = a.getBoundingClientRect().top;
    if (top < triggerBottom) {
      a.classList.add("rise");
    }
  }
}

function castRiseHistory() {
  let triggerBottom = (window.innerHeight / 5) * 4;
  let sectionA = document.getElementsByClassName("history-card");

  for (a of sectionA) {
    let top = a.getBoundingClientRect().top;
    if (top < triggerBottom - 700 || top >= triggerBottom) {
      a.classList.add("fall");
      a.classList.remove("rise");
    } else if (top < triggerBottom) {
      a.classList.add("rise");
      a.classList.remove("fall");
    }
  }
}
