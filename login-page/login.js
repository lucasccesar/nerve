const form = document.querySelector('#form');
const login = document.getElementById('login')
const signin = document.getElementById('signin')
login.addEventListener('transitionend', changeDelay)
let x = 1
const change = document.getElementById('change');
const inputs = document.querySelectorAll('input');
inputs.forEach((e) => {
    e.addEventListener('focus', moveLabelFocus);
    e.addEventListener('focusout', moveLabelFocusOut);
});
const createAccount = document.getElementById('createAccount')
const loginAccount = document.getElementById('loginAccount')
createAccount.addEventListener('click', sla)
loginAccount.addEventListener('click', sla)
const loginText = document.getElementById('loginText')
const createText = document.getElementById('createText')

function changeDelay(){
    console.log(x)
    if((x/4)%4==1){
        signin.style.transitionDelay = '0ms'
        login.style.transitionDelay = '125ms'
    } if((x/4)%4 == 2){
        signin.style.transitionDelay = '125ms'
        login.style.transitionDelay = '0ms'
        x = 0
    }
    x++
}

function moveLabelFocus(event) {
    if(event.target.id != 'submit'){
        event.target.parentElement.parentElement.firstElementChild.style.transform = `translateY(-24px)`;
        event.target.parentElement.parentElement.firstElementChild.style.fontSize = `14px`;
    }
}

function moveLabelFocusOut(event) {
    console.log(event.target.type)
    if (event.target.value != '' || event.target.type == "date") {
    } else {
        event.target.parentElement.parentElement.firstElementChild.style.transform = `translateY(0px)`;
        event.target.parentElement.parentElement.firstElementChild.style.fontSize = `19px`;
    }
}

function sla() {
    if (form.style.left != '50%') {
        form.style.left = '50%';
        change.style.left = '-50%';
        login.style.opacity = '0%'
        login.style.visibility = 'hidden'
        signin.style.opacity = '100%'
        signin.style.visibility = 'visible'
        loginText.style.opacity = '0%'
        loginText.style.visibility = 'hidden'
        createText.style.opacity = '100%'
        createText.style.visibility = 'visible'
    } else {
        form.style.left = '0%';
        change.style.left = '0%';
        signin.style.opacity = '0%'
        signin.style.visibility = 'hidden'
        login.style.opacity = '100%'
        login.style.visibility = 'visible'
        createText.style.opacity = '0%'
        createText.style.visibility = 'hidden'
        loginText.style.opacity = '100%'
        loginText.style.visibility = 'visible'
    }
}
