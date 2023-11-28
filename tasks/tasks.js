import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if (user == null) {
    window.location = 'login.html';
} else {
    var token = JSON.parse(localStorage.getItem('authTokens'));
    let p = document.querySelector('p');
    let addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTaskHandler);
    let addTask = document.getElementById('addTask');
    addTask.addEventListener('click', (event) => {
        if (event.target.id == 'addTask') {
            addTask.style.display = 'none';
        }
    });
    let form = document.getElementById('taskForm');
    let userDiv = document.getElementById('user');
    let dropdownDiv = document.getElementById('dropdownDiv');
    let logout = document.getElementById('logout');
    userDiv.addEventListener('click', (event) => {
        if (event.target != logout) {
            if (dropdownDiv.style.transform != `translateY(0px)`) {
                dropdownDiv.style.transform = `translateY(0px)`;
                dropdownDiv.style.opacity = '100%'
                dropdownDiv.style.visibility = 'visible'
            } else {
                dropdownDiv.style.transform = 'translateY(-0.3vw)';
                dropdownDiv.style.opacity = '0%'
                dropdownDiv.style.visibility = 'hidden'
            }
        }
    });

    logout.addEventListener('click', () => {
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
        window.location.reload();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let tokens = JSON.parse(localStorage.getItem('authTokens'));

        if (tokens) {
            let task = {
                title: e.target.taskTitle.value,
                task_content: e.target.taskDescription.value,
                state: e.target.urgencyCheckbox.checked ? 'urgencia' : 'pendente',
                worklist: (e.target.worklistCheckbox.checked).toString(),
                date: e.target.deadline.value + ':00',
            };
            let response = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization":`Bearer ${token.refresh.access}` }, body: JSON.stringify(task) });
            let data = await response.json();

            if (response.status === 201) {
                window.location = 'tasks.html';
            } else {
                logout();
            }
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
}
