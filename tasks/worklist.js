import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if (user == null) {
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
    let loading = document.querySelectorAll('.loading');
    let vw = window.innerWidth/100

    let response = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` } })
        .then(
            loading.forEach((e) => {
                e.style.display = 'inline-block';
            })
        )
        .then((response) => {
            loading.forEach((e) => {
                e.style.display = 'none';
            });
            return response.json();
        });

    console.log(response);

    let filteredResponse = [];

    response.forEach((e) => {
        if (e.worklist == true) {
            filteredResponse[filteredResponse.length] = e;
        }
    });

    if (filteredResponse.length == 0) {
        noTasks.style.display = 'flex';
    } else {
        tasks.style.display = 'flex';
    }

    let tasksDisplayWrapper = document.querySelector('#tasksDisplayWrapper');

    console.log(filteredResponse);

    for (let i = 0; i < filteredResponse.length; i++) {
        console.log(tasksDisplayWrapper.firstElementChild.firstElementChild.children[i])
        for (const [key, value] of Object.entries(filteredResponse[i])) {
            tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.dataset[key] = `${value}`;
        }
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText = filteredResponse[i].title;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.firstElementChild.lastElementChild.innerText = `Prazo: ${new Date(filteredResponse[i].date).toLocaleDateString('pt-BR')} ${new Date(filteredResponse[i].date).toLocaleTimeString('pt-BR')}`;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerText = `${filteredResponse[i].task_content}`;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.style.visibility = 'visible';
    }

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
    let edit = document.getElementById('edit');
    let editTaskBtn = document.querySelectorAll('.tasksBoxWrapper button');
    let editTask = document.getElementById('editTask');
    let editTaskForm = document.getElementById('editTaskForm');
    let form = document.getElementById('taskForm');
    let userDiv = document.getElementById('user');
    let dropdownDiv = document.getElementById('dropdownDiv');
    let logout = document.getElementById('logout');
    userDiv.addEventListener('click', (event) => {
        if (event.target != logout) {
            if (dropdownDiv.style.transform != `translateY(0px)`) {
                dropdownDiv.style.transform = `translateY(0px)`;
                dropdownDiv.style.opacity = '100%';
                dropdownDiv.style.visibility = 'visible';
            } else {
                dropdownDiv.style.transform = 'translateY(-0.3vw)';
                dropdownDiv.style.opacity = '0%';
                dropdownDiv.style.visibility = 'hidden';
            }
        }
    });

    let tasksDisplayLeft = document.querySelector('.tasksDisplayLeft')
    let tasksDisplayLeftArray = [...tasksDisplayLeft.children]
    console.log(tasksDisplayLeftArray)

    var array = []

    tasksDisplayLeftArray.forEach((e, index) => {
        e.style.height = `${(tasksDisplayLeft.offsetHeight - 2 * vw)/3}px`
        e.style.transform = `translateY(${(((tasksDisplayLeft.offsetHeight - 2 * vw)/3) + vw) * index}px)`
        array[index] = (((tasksDisplayLeft.offsetHeight - 2 * vw)/3) + vw) * index
    });

    console.log(array)

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
                worklist: e.target.worklistCheckbox.checked.toString(),
                date: e.target.deadline.value + ':00',
            };
            let response = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` }, body: JSON.stringify(task) });
            let data = await response.json();

            if (response.status === 201) {
                window.location.reload();
            } else {
                logout();
            }
        }
    });

    edit.addEventListener('click', () => {
        edit.innerText = edit.innerText == 'Editar' ? 'Cancelar' : 'Editar';
        edit.previousElementSibling.previousElementSibling.innerText = edit.innerText;
        editTaskBtn.forEach((e) => {
            e.style.display = e.style.display == 'inline-block' ? 'none' : 'inline-block';
            e.addEventListener('click', () => {
                editTask.firstElementChild.dataset.id = e.parentElement.firstElementChild.dataset.id;

                document.getElementById('editTaskTitle').value = e.parentElement.firstElementChild.dataset.title;
                document.getElementById('editWorklistCheckbox').value = e.parentElement.firstElementChild.dataset.worklist;
                if (JSON.parse(document.getElementById('editWorklistCheckbox').value) == true) {
                    document.getElementById('editWorklistCheckbox').parentElement.firstElementChild.style.transform = 'translateX(100%)';
                    document.getElementById('editWorklistCheckbox').parentElement.style.backgroundColor = 'darkcyan';
                } else {
                    document.getElementById('editWorklistCheckbox').parentElement.firstElementChild.style.transform = 'translateX(0%)';
                    document.getElementById('editWorklistCheckbox').parentElement.style.backgroundColor = 'white';
                }
                document.getElementById('editUrgencyCheckbox').value = false;
                document.getElementById('editDeadline').value = e.parentElement.firstElementChild.dataset.date.substr(0, 16);
                document.getElementById('editTaskDescription').value = e.parentElement.firstElementChild.dataset.task_content;

                editTask.style.display = 'flex';
                editTask.addEventListener('click', (event) => {
                    if (event.target.id == 'editTask') {
                        editTask.style.display = 'none';
                    }
                });
            });
        });
    });

    document.getElementById('conclude').addEventListener('click', async (event) => {
        event.preventDefault();

        let tokens = JSON.parse(localStorage.getItem('authTokens'));

        if (tokens) {
            let editTask = {
                title: event.target.parentElement.editTaskTitle.value,
                task_content: event.target.parentElement.editTaskDescription.value,
                state: 'concluido',
                worklist: event.target.parentElement.editWorklistCheckbox.checked.toString(),
                date: event.target.parentElement.editDeadline.value + ':00',
            };
            let response = await fetch(`https://pi-kxis.onrender.com/api/task/${event.target.parentElement.dataset.id}/`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` }, body: JSON.stringify(editTask) });
            let data = await response.json();

            if (response.status === 200) {
                window.location.reload();
            } else {
                logout();
            }
        }
    });

    document.getElementById('save').addEventListener('click', async (event) => {
        event.preventDefault();

        let tokens = JSON.parse(localStorage.getItem('authTokens'));

        if (tokens) {
            let editTask = {
                title: event.target.parentElement.parentElement.editTaskTitle.value,
                task_content: event.target.parentElement.parentElement.editTaskDescription.value,
                state: event.target.parentElement.parentElement.editUrgencyCheckbox.checked ? 'urgencia' : 'pendente',
                worklist: event.target.parentElement.parentElement.editWorklistCheckbox.checked.toString(),
                date: event.target.parentElement.parentElement.editDeadline.value + ':00',
            };
            let response = await fetch(`https://pi-kxis.onrender.com/api/task/${event.target.parentElement.parentElement.dataset.id}/`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` }, body: JSON.stringify(editTask) });
            let data = await response.json();

            if (response.status === 200) {
                window.location.reload();
            } else {
                logout();
            }
        }
    });

    document.getElementById('delete').addEventListener('click', async (event) => {
        event.preventDefault();

        let tokens = JSON.parse(localStorage.getItem('authTokens'));

        if (tokens) {
            let response = await fetch(`https://pi-kxis.onrender.com/api/task/${event.target.parentElement.parentElement.dataset.id}/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` } });
            let data = await response.json();

            if (response.status === 202) {
                window.location.reload();
            } else {
                logout();
            }
        }
    });

    function addTaskHandler() {
        addTask.style.display = 'flex';
        var sla = new Date().toString().split(' ');
        document.getElementById('deadline').min = `${new Date().toISOString().split('T')[0]} ${sla[4].split(':')[0] + ':' + sla[4].split(':')[1]}`;
    }

    p.innerHTML += `${user.name} ${user.lastname}`;
}
