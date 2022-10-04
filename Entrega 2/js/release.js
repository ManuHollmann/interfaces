window.addEventListener("scroll", checkScroll)

checkScroll()



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