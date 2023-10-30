const body = document.querySelector('body');
const root = document.querySelector(':root');
const header = document.querySelector('header');
const preloader = document.getElementById('preloader');
const carregando = document.querySelector('#preloader p');
const preloadingLogo = document.getElementById('preloadingLogo');
const preloadingTitle = document.getElementById('preloadingTitle');
const preloadingText = document.getElementById('preloadingText');
const transition = document.getElementById('transition');
document.getElementById('funcionamentos').addEventListener('mouseenter',showDescription)
document.getElementById('objetivos').addEventListener('mouseenter',showDescription)
document.getElementById('funcionamentos').addEventListener('mouseleave',hideDescription)
document.getElementById('objetivos').addEventListener('mouseleave',hideDescription)
header.style.transform = `translateY(-${header.offsetHeight}px)`;

window.addEventListener('load', (event) => {
    window.scrollTo(0, 0);
    carregando.style.opacity = '0%';

    setTimeout(() => {
        carregando.style.display = 'none';
    }, 300);

    preloadingLogo.classList.add('showPreloading');
    preloadingTitle.classList.add('showPreloading');
    preloadingText.classList.add('showPreloading');

    setTimeout(() => {
        header.style.transition = '400ms';
        preloader.style.height = '0px';
        root.style.overflowY = 'scroll';
    }, 2000);
});

window.onbeforeunload = function () {
    header.style.transition = '0ms';
    header.style.visibility = 'hidden';
    header.style.transform = `translateY(-${header.offsetHeight}px)`;
    preloader.style.height = '100vh';
    history.scrollRestoration = 'manual';
    window.scrollTop(0);
};

window.addEventListener('scroll', (event) => {
    let scroll = this.scrollY;
});

const observer = new IntersectionObserver((entries) => {
    if (entries[0].target.id == 'transition') {
        let title = document.querySelector('.divTitle');
        let sobre = document.getElementById('sobreWrapper')
        let description = document.querySelector('.divDescription')
        if (entries[0].isIntersecting) {
            title.classList.replace('divTitleHidden', 'divTitleShown');
            description.classList.replace('divTitleHidden', 'divTitleShown');
            sobre.style.opacity = '100%'
            sobre.style.gap = '5vw'
        } else {
            if (title.classList[1] == 'divTitleShown') {
                title.classList.replace('divTitleShown', 'divTitleHidden');
                description.classList.replace('divTitleShown', 'divTitleHidden');
            }
            if(sobre.style.gap == '5vw'){
                sobre.style.opacity = '0%'
                sobre.style.gap = '30vw'
            }
        }
    }

    if (entries[0].target.id == 'preloadingTitle') {
        if (!entries[0].isIntersecting) {
            header.style.transition = '400ms';
            header.style.visibility = 'visible';
            header.style.transform = `translateY(0px)`;
        } else{
            header.style.visibility = 'hidden';
            header.style.transform = `translateY(-${header.offsetHeight}px)`;
        }
    }

    /* entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.parentElement.classList.add('show') ;
        } else {
            entry.target.parentElement.classList.remove('show') ;
        }
    }); */
});

observer.observe(transition);

function showDescription(event){
    event.target.firstElementChild.style.height = '3vw'
    document.querySelector(`#${event.target.id} .descriptionDiv`).style.height = `${event.target.children[2].firstElementChild.offsetHeight}px`
}

function hideDescription(event){
    event.target.firstElementChild.style.height = '6vw'
    document.querySelector(`#${event.target.id} .descriptionDiv`).style.height = `0px`
}


observer.observe(preloadingTitle);

/* const hiddenChildren = document.querySelectorAll('.hiddenChild') ;
hiddenChildren.forEach((el) => observer.observe(el) && console.log(el)); */
