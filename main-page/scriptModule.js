import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

let loginBtn = document.getElementById('loginBtn')
let startXp = document.getElementById('startXp')

loginBtn.addEventListener('click', abrirHandler)
startXp.addEventListener('click', abrirHandler)

function abrirHandler(){
    if(user==null){
        window.location = 'login.html'
    } else{
        window.location = 'tasks.html'
    }
}