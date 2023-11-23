import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if (user == null) {
    console.log(window.locaton);
    window.location = window.location.origin + '/login.html';
} else {
    var token = JSON.parse(localStorage.getItem('authTokens'));
    let p = document.querySelector('p');
    let noTasks = document.getElementById('noTasks');
    let tasks = document.getElementById('tasks');
    let addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTaskHandler);
    let addTask = document.getElementById('addTask');
    addTask.addEventListener('click', (event) => {
        if (event.target.id == 'addTask') {
            addTask.style.display = 'none';
        }
    });

    document.getElementById('worklistCheckbox').checked = false;
    let switchCB = document.querySelectorAll('.switch');
    switchCB.forEach((e) => {
        e.addEventListener('click', (event) => {
            e.lastElementChild.checked = !e.lastElementChild.checked;
            if (e.lastElementChild.checked == true) {
                e.firstElementChild.style.transform = 'translateX(100%)';
                e.style.backgroundColor = 'darkcyan';
            } else {
                e.firstElementChild.style.transform = 'translateX(0)';
                e.style.backgroundColor = 'white';
            }
        });
    });

    function addTaskHandler() {
        addTask.style.display = 'flex';
        var sla = new Date().toString().split(' ');
        document.getElementById('deadline').min = `${new Date().toISOString().split('T')[0]} ${sla[4].split(':')[0] + ':' + sla[4].split(':')[1]}`;
    }

    p.innerHTML += `${user.name} ${user.lastname}`;
    let response = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` } })
        .then((document.getElementById('loading').style.display = 'inline-block'))
        .then((response) => {
            document.getElementById('loading').style.display = 'none';
            return response.json();
        });

    /* task = {
        title: 'Titulo',
        task_content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        state: 'pendente',
        worklist: false,
    };

    await fetch('http://127.0.0.1:8000/api/task/', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(task) }); */

    console.log(response);

    response.forEach((e, index) => {
        let tasksDisplay = document.querySelector('.tasksDisplay');

        if (index % 2 == 0) {
            tasksDisplay.firstElementChild.children[index / 2].dataset.id = e.id;
            tasksDisplay.firstElementChild.children[index / 2].firstElementChild.firstElementChild.firstElementChild.innerText = e.title;
            tasksDisplay.firstElementChild.children[index / 2].firstElementChild.lastElementChild.innerText = `Prazo: ${new Date(e.date).toLocaleDateString('pt-BR')} ${new Date(e.date).toLocaleTimeString('pt-BR')}`;
            tasksDisplay.firstElementChild.children[index / 2].lastElementChild.firstElementChild.innerText = `${e.task_content}`;
            tasksDisplay.firstElementChild.children[index / 2].style.visibility = 'visible';
        } else if (index % 2 == 1) {
            tasksDisplay.lastElementChild.children[index / 2 - 0.5].dataset.id = e.id;
            tasksDisplay.lastElementChild.children[index / 2 - 0.5].firstElementChild.firstElementChild.firstElementChild.innerText = e.title;
            tasksDisplay.lastElementChild.children[index / 2 - 0.5].firstElementChild.lastElementChild.innerText = `Prazo: ${new Date(e.date).toLocaleDateString('pt-BR')} ${new Date(e.date).toLocaleTimeString('pt-BR')}`;
            tasksDisplay.lastElementChild.children[index / 2 - 0.5].lastElementChild.firstElementChild.innerText = `${e.task_content}`;
            tasksDisplay.lastElementChild.children[index / 2 - 0.5].style.visibility = 'visible';
        }
    });

    if (response.length == 0) {
        noTasks.style.display = 'flex';
    } else {
        tasks.style.display = 'flex';
    }
}
