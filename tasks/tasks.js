import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if (user == null) {
    window.location = 'login.html';
} else {
    var token = JSON.parse(localStorage.getItem('authTokens'));
    let p = document.querySelector('p');
    let noTasks = document.getElementById('noTasks');
    let tasks = document.getElementById('tasks');

    p.innerHTML += `${user.name} ${user.lastname}`;
    let response = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` } }).then(console.log('carregando')).then((response) => response.json());

    /* task = {
        title: 'Titulo',
        task_content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        state: 'pendente',
        worklist: false,
    };

    await fetch('http://127.0.0.1:8000/api/task/', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(task) }); */
    
    console.log(response);

    if (response.length == 0) {
        noTasks.style.display = 'flex';
    } else {
        tasks.style.display = 'flex';
    }
}
