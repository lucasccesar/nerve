const body = document.querySelector('body')
const logo = document.getElementById('logo')
const header = document.querySelector('header')
header.style.transform = `translateY(-${header.offsetHeight}px)`
var logoScroll = logo.scrollTop
var logoW = logo.offsetWidth
var logoH = logo.offsetHeight
var logoCenterX = logo.offsetLeft
var logoSideX = logoCenterX - logoW/2
var logoCenterY = logo.offsetTop
var logoSideY = logoCenterY - logoH/2

console.log(logoH+logoSideY)

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    console.log(scroll)
    
    if(scroll>logoH+logoSideY){
        header.style.visibility = 'visible'
        header.style.transform = 'translateY(0px)'
    } else if(scroll<logoH+logoSideY){
        header.style.visibility = 'hidden'
        header.style.transform = `translateY(-${header.offsetHeight}px)`
    }
});

