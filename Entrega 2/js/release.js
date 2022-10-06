window.addEventListener("scroll", checkScroll)
checkScroll()

const slider = document.querySelector('.slider-inner');
const progressBar = document.querySelector('.prog-bar-inner');

let sliderGrabbed = false;

slider.parentElement.addEventListener('scroll', (e) => {
    progressBar.style.width  = `${getScrollPercentage()}%`
})

slider.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    slider.style.cursor = 'grabbing';
})

slider.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    slider.style.cursor = 'grab';
})

slider.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
})

slider.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        slider.parentElement.scrollLeft -= e.movementX;
    }
})

slider.addEventListener('wheel', (e) =>{
    e.preventDefault()
    slider.parentElement.scrollLeft += e.deltaY;
})

function getScrollPercentage(){
   return ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth - slider.parentElement.clientWidth) ) * 100);
}

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