window.addEventListener("scroll", checkScroll)
checkScroll()

const slider = document.querySelectorAll('.slider-inner');
const progressBar = document.querySelectorAll('.prog-bar-inner');

let sliderGrabbed = false;

slider.forEach(x=>{
  x.parentElement.addEventListener('scroll', (e) => {
    progressBar.forEach(y =>{
      if(x.dataset.scroll == y.dataset.progres){
        y.style.width  = `${(x.parentElement.scrollLeft / ( x.parentElement.scrollWidth - x.parentElement.clientWidth) ) * 100}%`
      }
    })
  })
})

slider.forEach(x =>{
  x.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    x.style.cursor = 'grabbing';
  })
})

slider.forEach(x => {
  x.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    x.style.cursor = 'grab';
  })
})

slider.forEach(x => {
  x.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
  })
})

slider.forEach(x =>{
  x.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        x.parentElement.scrollLeft -= e.movementX;
    }
  })
})

slider.forEach(x => {
  x.addEventListener('wheel', (e) =>{
    e.preventDefault()
    x.parentElement.scrollLeft += e.deltaY;
  })
})

function boundCards() {
    const container_rect = container.getBoundingClientRect();
    const cards_rect = cards.getBoundingClientRect();
  
    if (parseInt(cards.style.left) > 0) {
      cards.style.left = 0;
    } else if (cards_rect.right < container_rect.right) {
      cards.style.left = `-${cards_rect.width - container_rect.width}px`;
    }
  }

function checkScroll(){
    let triggerBottom = window.innerHeight /5 * 4
    let sectionA = document.getElementsByClassName("gameSectionA")
    let sectionB = document.getElementsByClassName("gameSectionB")
    
    
    for(b of sectionB){
        let top = b.getBoundingClientRect().top
        if(top < triggerBottom){
            b.classList.add("show")
        }
    }
    for(a of sectionA){
        let top = a.getBoundingClientRect().top
        if(top < triggerBottom){
        a.classList.add("show")
        }
    }
}