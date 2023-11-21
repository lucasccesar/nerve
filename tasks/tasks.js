import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if(user==null){
    window.location='login.html'
} else{
    let p = document.querySelector('p');
    p.innerHTML += `${user.name} ${user.lastname}`;
}

