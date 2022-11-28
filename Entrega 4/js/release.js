setTimeout(function () {
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("scroll", castRiseCarousels);
  window.addEventListener("scroll", castRiseHistory);
  checkScroll();
}, 2000);
/*5300*/

const sliderCard = document.querySelectorAll(".slider-inner");
const progressBar = document.querySelectorAll(".prog-bar-inner");

let sliderGrabbed = false;

sliderCard.forEach((x) => {
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

sliderCard.forEach((x) => {
  x.addEventListener("mousedown", (e) => {
    sliderGrabbed = true;
    x.style.cursor = "grabbing";
  });
});

sliderCard.forEach((x) => {
  x.addEventListener("mouseup", (e) => {
    sliderGrabbed = false;
    x.style.cursor = "grab";
  });
});

sliderCard.forEach((x) => {
  x.addEventListener("mouseleave", (e) => {
    sliderGrabbed = false;
  });
});

sliderCard.forEach((x) => {
  x.addEventListener("mousemove", (e) => {
    if (sliderGrabbed) {
      x.parentElement.scrollLeft -= e.movementX;
    }
  });
});

sliderCard.forEach((x) => {
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
    let top = this.pageYOffset;

    let character = document.getElementById("character-img");
    let speed = character.getAttribute("data-speed");
    let xPos = -((top * speed) / 100);
    if (xPos > -1100) {
      character.setAttribute(
        "style",
        "transform: translate3d(" + xPos + "px, 0px, 0px)"
      );
    }

    let logo = document.getElementById("logo-hero");
    let speed2 = logo.getAttribute("data-speed");

    let yPos = (top * speed2) / 100;
    if (yPos < 586.56) {
      logo.setAttribute(
        "style",
        "transform: translate3d(0px, " + yPos + "px, 0px)"
      );
    }
    let distanceToTop = window.pageYOffset + logo.getBoundingClientRect().top;
    let elementHeight = logo.offsetHeight;
    let scrollTop = document.documentElement.scrollTop + 55;

    let opacity = 1;

    if (scrollTop > distanceToTop) {
      opacity = 1 - (scrollTop * 1.3 - distanceToTop) / elementHeight;
    }

    if (opacity >= 0) {
      logo.style.opacity = opacity;
    }
  });
}

let header = document.querySelector("header");
let logo = document.getElementById("nav-logo");
let hamburger = document.getElementById("hamburger");
let distanceToTop = window.pageYOffset + header.getBoundingClientRect().top;
let elementHeight = header.offsetHeight;
let scrollTop = document.documentElement.scrollTop + 55;

logo.style.width =
  (7 - (scrollTop * 1.3 - distanceToTop) / elementHeight) * 20 + "%";
hamburger.style.height =
  (7 - (scrollTop * 1.3 - distanceToTop) / elementHeight) * 30 + "%";

function castHeader() {
  window.addEventListener("scroll", function (event) {
    let header = document.querySelector("header");
    let logo = document.getElementById("nav-logo");
    let hamburger = document.getElementById("hamburger");
    let distanceToTop = window.pageYOffset + header.getBoundingClientRect().top;
    let elementHeight = header.offsetHeight;
    let scrollTop = document.documentElement.scrollTop + 55;

    let height = 7;

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

function castRiseHero() {
  let triggerBottom = (window.innerHeight / 5) * 4;
  let sectionA = document.getElementsByClassName("hero-card");

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

//Scroll cards history
let faders = document.querySelectorAll(".fade-in");
let sliders = document.querySelectorAll(".slide-in");
let slidersUp = document.querySelectorAll(".slide-up");

let historytext1 = document.querySelector("#history-text-1");
let historytext2 = document.querySelector("#history-text-2");
let historytext3 = document.querySelector("#history-text-3");

let historyCard1 = document.querySelector("#history-card-1");
let historyCard2 = document.querySelector("#history-card-2");
let historyCard3 = document.querySelector("#history-card-3");

let trailer = document.querySelector("#trailer");
let historyImg1 = document.querySelector("#history-img-1");
let historyImg3 = document.querySelector("#history-img-3");
let historyParagraph1 = document.querySelector("#history-paragraph-1");
let historyParagraph3 = document.querySelector("#history-paragraph-3");

let containerCharacters = document.querySelectorAll(
  "article.characters .container-characters"
);
let characters = document.querySelectorAll("article.characters ul");

window.addEventListener("scroll", scrollAppear);

function scrollAppear() {
  faders.forEach((fader) => {
    let top = fader.getBoundingClientRect().top;
    let bottom = fader.getBoundingClientRect().bottom;
    let scroll = window.innerHeight - window.innerHeight / 2;
    if (top < scroll) {
      fader.classList.add("appear");
    } else {
      fader.classList.remove("appear");
    }
  });

  sliders.forEach((slider) => {
    let top = slider.getBoundingClientRect().top;
    let bottom = slider.getBoundingClientRect().bottom;
    let scroll = window.innerHeight;
    if (top >= 0 && bottom <= scroll) {
      slider.classList.add("appear");
    }
  });

  let position = window.innerHeight - window.innerHeight / 2;
  let topPosition = historytext1.getBoundingClientRect().top;
  let topPosition1 = historytext2.getBoundingClientRect().top;
  let topPosition2 = historytext3.getBoundingClientRect().top;
  let topTrailer = trailer.getBoundingClientRect().top;

  if (topPosition < position) {
    historyCard1.classList.add("showContent");
    historytext1.classList.remove("fade-in");
    if (historyCard2.classList.contains("showContent")) {
      historyCard2.classList.remove("showContent");
      historytext2.classList.add("fade-in");
    }
  } else {
    historyImg1.classList.remove("appear");
    historyParagraph1.classList.remove("appear");
  }

  if (topPosition1 < position) {
    historyCard1.classList.remove("showContent");
    historytext1.classList.add("fade-in");
    historyCard2.classList.add("showContent");
    historytext2.classList.remove("fade-in");
    if (historyCard3.classList.contains("showContent")) {
      historyCard3.classList.remove("showContent");
      historytext3.classList.add("fade-in");
    }
  }

  if (topPosition2 < position) {
    historyCard2.classList.remove("showContent");
    historytext2.classList.add("fade-in");
    historyCard3.classList.add("showContent");
    historytext3.classList.remove("fade-in");
  }

  if (topTrailer < position) {
    historyImg3.classList.remove("appear");
    historyParagraph3.classList.remove("appear");
  }

  slidersUp.forEach((slider) => {
    let top = slider.getBoundingClientRect().top;
    let scroll = window.innerHeight;
    if (top < scroll) {
      slider.classList.add("appear");
    }
  });
}
