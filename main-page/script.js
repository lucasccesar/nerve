const vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)*(1/100))
const body = document.querySelector('body');
const root = document.querySelector(':root');
const header = document.querySelector('header');
const preloader = document.getElementById('preloader');
const carregando = document.querySelector('#preloader p');
const preloadingLogo = document.getElementById('preloadingLogo');
const preloadingTitle = document.getElementById('preloadingTitle');
const preloadingText = document.getElementById('preloadingText');
const faq = document.getElementById('faq')
let faqHeight = faq.offsetHeight - (6*vw)
const faqs = document.querySelectorAll('.faqs');
const faqsHeight = faqs[0].offsetHeight
faqs.forEach((e) => {
    e.addEventListener('click', faqsExpand);
});
let scroll1 = 0;
let scroll2 = 0;
document.getElementById('funcionamentos').addEventListener('mouseenter', showDescription);
document.getElementById('objetivos').addEventListener('mouseenter', showDescription);
document.getElementById('funcionamentos').addEventListener('mouseleave', hideDescription);
document.getElementById('objetivos').addEventListener('mouseleave', hideDescription);
header.style.transform = `translateY(-${header.offsetHeight}px)`;

function faqsExpand(event) {
    faqDiv = event.target.parentElement;
    if (event.target.nodeName == 'BUTTON') {
        if (faqDiv.style.gap == '0vw') {
            faq.style.height = `${faqHeight + event.target.parentElement.lastElementChild.firstElementChild.offsetHeight + vw}px`
            faqHeight = faqHeight + event.target.parentElement.lastElementChild.firstElementChild.offsetHeight + vw
            faqDiv.style.gap = '1vw';
            event.target.parentElement.lastElementChild.style.height = `${event.target.parentElement.lastElementChild.firstElementChild.offsetHeight}px`;
            event.target.parentElement.firstElementChild.nextElementSibling.lastElementChild.style.rotate = '45deg';
        } else {
            faq.style.height = `${faqHeight - event.target.parentElement.lastElementChild.firstElementChild.offsetHeight - vw}px`
            faqHeight = faqHeight - event.target.parentElement.lastElementChild.firstElementChild.offsetHeight - vw
            faqDiv.style.gap = '0vw';
            event.target.parentElement.lastElementChild.style.height = 0;
            event.target.parentElement.firstElementChild.nextElementSibling.lastElementChild.style.rotate = '0deg';
        }
    }
}

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
    scroll1 = this.scrollY;
    if (scroll1 < preloadingText.offsetTop + preloadingText.offsetHeight || scroll1 > scroll2) {
        header.style.visibility = 'hidden';
        header.style.transform = `translateY(-${header.offsetHeight}px)`;
    } else if (scroll1 < scroll2) {
        header.style.transition = '400ms';
        header.style.visibility = 'visible';
        header.style.transform = `translateY(0px)`;
    }
    scroll2 = scroll1;
});

const observer = new IntersectionObserver((entries) => {
    if (entries[0].target.id == 'funcionamentos') {
        let title = document.querySelector('.divTitle');
        let sobre = document.getElementById('sobreWrapper');
        let description = document.querySelector('.divDescription');
        let btn = document.querySelector('#sobre a');
        if (entries[0].isIntersecting) {
            title.classList.replace('divTitleHidden', 'divTitleShown');
            description.classList.replace('divTitleHidden', 'divTitleShown');
            sobre.style.opacity = '100%';
            sobre.style.gap = '10vw';
            btn.style.transform = 'translateY(0px)';
            btn.style.opacity = '100%';
        } else {
            if (title.classList[1] == 'divTitleShown') {
                title.classList.replace('divTitleShown', 'divTitleHidden');
                description.classList.replace('divTitleShown', 'divTitleHidden');
            }
            if (sobre.style.gap == '10vw') {
                sobre.style.opacity = '0%';
                sobre.style.gap = '30vw';
            }
            btn.style.transform = 'translateY(-150%)';
            btn.style.opacity = '0%';
        }
    }

    if (entries[0].target.id == 'imagesSlider2') {
        let title = entries[0].target.previousElementSibling.previousElementSibling.firstElementChild;
        let description = entries[0].target.previousElementSibling.previousElementSibling.lastElementChild;
        let sibling = entries[0].target.previousElementSibling;
        if (entries[0].isIntersecting) {
            title.classList.replace('divTitleHidden', 'divTitleShown');
            description.classList.replace('divTitleHidden', 'divTitleShown');
            entries[0].target.style.opacity = '100%';
            sibling.style.opacity = '100%';
        } else {
            if (title.classList[1] == 'divTitleShown') {
                title.classList.replace('divTitleShown', 'divTitleHidden');
                description.classList.replace('divTitleShown', 'divTitleHidden');
                entries[0].target.style.opacity = '0%';
                sibling.style.opacity = '0%';
            }
        }
    }

    if (entries[0].target.id == 'faqsDiv') {
        let title = entries[0].target.previousElementSibling.firstElementChild;
        let description = entries[0].target.previousElementSibling.lastElementChild;
        /* let sibling = entries[0].target.previousElementSibling; */
        if (entries[0].isIntersecting) {
            title.classList.replace('divTitleHidden', 'divTitleShown');
            description.classList.replace('divTitleHidden', 'divTitleShown');
            entries[0].target.style.opacity = '100%';
            faqs.forEach(e => {
                e.classList.replace('divTitleHidden', 'divTitleShown');
            });
            /* sibling.style.opacity = '100%' */
        } else {
            if (title.classList[1] == 'divTitleShown') {
                title.classList.replace('divTitleShown', 'divTitleHidden');
                description.classList.replace('divTitleShown', 'divTitleHidden');
                entries[0].target.style.opacity = '0%';
                faqs.forEach(e => {
                    e.classList.replace('divTitleShown', 'divTitleHidden');
                });
                /* sibling.style.opacity = '0%' */
            }
        }
    }

    /* if (entries[0].target.id == 'preloadingTitle') {
        if (!entries[0].isIntersecting) {
            header.style.transition = '400ms';
            header.style.visibility = 'visible';
            header.style.transform = `translateY(0px)`;
        } else{
            header.style.visibility = 'hidden';
            header.style.transform = `translateY(-${header.offsetHeight}px)`;
        }
    } */

    /* entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.parentElement.classList.add('show') ;
        } else {
            entry.target.parentElement.classList.remove('show') ;
        }
    }); */
});

const faqsDiv = document.getElementById('faqsDiv');
observer.observe(faqsDiv);
const imagesSlider = document.getElementById('imagesSlider2');
observer.observe(imagesSlider);
const funcionamentos = document.getElementById('funcionamentos');
observer.observe(funcionamentos);

function showDescription(event) {
    event.target.firstElementChild.style.height = '3vw';
    document.querySelector(`#${event.target.id} .descriptionDiv`).style.height = `${event.target.children[2].firstElementChild.offsetHeight}px`;
}

function hideDescription(event) {
    event.target.firstElementChild.style.height = '6vw';
    document.querySelector(`#${event.target.id} .descriptionDiv`).style.height = `0px`;
}
