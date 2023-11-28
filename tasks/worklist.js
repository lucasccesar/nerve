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
    let vw = window.innerWidth / 100;

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
        for (const [key, value] of Object.entries(filteredResponse[i])) {
            tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.dataset[key] = `${value}`;
        }
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText = filteredResponse[i].title;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild.style.backgroundColor = `${filteredResponse[i].state == 'urgencia' ? 'red' : '#DC9F01'}`;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.firstElementChild.lastElementChild.innerText = `Prazo: ${new Date(filteredResponse[i].date).toLocaleDateString('pt-BR')} ${new Date(filteredResponse[i].date).toLocaleTimeString('pt-BR')}`;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerText = `${filteredResponse[i].task_content}`;
        tasksDisplayWrapper.firstElementChild.firstElementChild.children[i].style.visibility = 'visible';
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

    document.getElementById('startTask').addEventListener('click', () => {
        document.getElementById('timerWrapper').style.display = `inline-block`;
        document.getElementById('timerWrapper').addEventListener('click', (event) => {
            if (event.target.id == 'timerWrapper') {
                document.getElementById('timerWrapper').style.display = `none`;
            }
        });
    });

    let tasksDisplayLeft = document.querySelector('.tasksDisplayLeft');
    let tasksDisplayLeftArray = [...tasksDisplayLeft.children];

    var array = [];
    var positionsArray = [0, 1, 2];
    var positionPH;

    tasksDisplayLeftArray.forEach((e, index) => {
        e.style.height = `${(tasksDisplayLeft.offsetHeight - 2 * vw) / 3}px`;
        e.style.transform = `translateY(${((tasksDisplayLeft.offsetHeight - 2 * vw) / 3 + vw) * index}px)`;
        array[index] = ((tasksDisplayLeft.offsetHeight - 2 * vw) / 3 + vw) * index;
    });

    console.log(array);

    document.querySelectorAll('.moveUp').forEach((e, index) => {
        e.addEventListener('click', (event) => {
            moveUpHandler(event, index);
        });
    });

    document.querySelectorAll('.moveDown').forEach((e, index) => {
        e.addEventListener('click', (event) => {
            moveDownHandler(event, index);
        });
    });

    function moveUpHandler(event, index) {
        if (index == 0) {
            if (positionsArray[index] > 0) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] - 1;
                if (positionsArray[index + 1] == positionsArray[index]) {
                    positionsArray[index + 1] = positionsArray[index] + 1;
                } else if (positionsArray[index + 2] == positionsArray[index]) {
                    positionsArray[index + 2] = positionsArray[index] + 1;
                }
            }
        } else if (index == 1) {
            if (positionsArray[index] > 0) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] - 1;
                if (positionsArray[index - 1] == positionsArray[index]) {
                    positionsArray[index - 1] = positionsArray[index] + 1;
                } else if (positionsArray[index + 1] == positionsArray[index]) {
                    positionsArray[index + 1] = positionsArray[index] + 1;
                }
            }
        } else if (index == 2) {
            if (positionsArray[index] > 0) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] - 1;
                if (positionsArray[index - 2] == positionsArray[index]) {
                    positionsArray[index - 2] = positionsArray[index] + 1;
                } else if (positionsArray[index - 1] == positionsArray[index]) {
                    positionsArray[index - 1] = positionsArray[index] + 1;
                }
            }
        }
        positionsArray.forEach((e, index) => {
            tasksDisplayLeft.children[index].style.transform = `translateY(${array[1] * e}px)`;
        });
    }

    console.log(filteredResponse);

    function moveDownHandler(event, index) {
        if (index == 0) {
            if (positionsArray[index] < filteredResponse.length - 1) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] + 1;
                if (positionsArray[index + 1] == positionsArray[index]) {
                    positionsArray[index + 1] = positionsArray[index] - 1;
                } else if (positionsArray[index + 2] == positionsArray[index]) {
                    positionsArray[index + 2] = positionsArray[index] - 1;
                }
            }
        } else if (index == 1) {
            if (positionsArray[index] < filteredResponse.length - 1) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] + 1;
                if (positionsArray[index - 1] == positionsArray[index]) {
                    positionsArray[index - 1] = positionsArray[index] - 1;
                } else if (positionsArray[index + 1] == positionsArray[index]) {
                    positionsArray[index + 1] = positionsArray[index] - 1;
                }
            }
        } else if (index == 2) {
            if (positionsArray[index] < filteredResponse.length - 1) {
                positionPH = positionsArray[index];
                positionsArray[index] = positionsArray[index] + 1;
                if (positionsArray[index - 2] == positionsArray[index]) {
                    positionsArray[index - 2] = positionsArray[index] - 1;
                } else if (positionsArray[index - 1] == positionsArray[index]) {
                    positionsArray[index - 1] = positionsArray[index] - 1;
                }
            }
        }
        positionsArray.forEach((e, index) => {
            tasksDisplayLeft.children[index].style.transform = `translateY(${array[1] * e}px)`;
        });
    }

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
        document.querySelectorAll('.drag').forEach((e) => {
            e.style.display = e.style.display == 'inline-block' ? 'none' : 'inline-block';
        });
        editTaskBtn.forEach((e) => {
            console.log(e);
            e.style.display = e.style.display == 'inline-block' ? 'none' : 'inline-block';
            e.addEventListener('click', () => {
                editTask.firstElementChild.dataset.id = e.parentElement.firstElementChild.dataset.id;

                document.getElementById('editTaskTitle').value = e.parentElement.firstElementChild.dataset.title;
                document.getElementById('editWorklistCheckbox').value = true;
                document.getElementById('editWorklistCheckbox').checked = true;

                document.getElementById('editWorklistCheckbox').parentElement.firstElementChild.style.transform = 'translateX(100%)';
                document.getElementById('editWorklistCheckbox').parentElement.style.backgroundColor = 'darkcyan';

                if (e.parentElement.firstElementChild.dataset.state == 'urgencia') {
                    document.getElementById('editUrgencyCheckbox').parentElement.firstElementChild.style.transform = 'translateX(100%)';
                    document.getElementById('editUrgencyCheckbox').parentElement.style.backgroundColor = 'darkcyan';
                    document.getElementById('editUrgencyCheckbox').value = true;
                    document.getElementById('editUrgencyCheckbox').checked = true;
                } else {
                    document.getElementById('editUrgencyCheckbox').parentElement.firstElementChild.style.transform = 'translateX(0%)';
                    document.getElementById('editUrgencyCheckbox').parentElement.style.backgroundColor = 'white';
                    document.getElementById('editUrgencyCheckbox').value = false;
                    document.getElementById('editUrgencyCheckbox').checked = false;
                }
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
                worklist: false,
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

    let isEditingTime = false;
    let timeNums = [0, 0, 0, 0];
    let nums = document.querySelectorAll('.num');

    function numFunc(event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || event.key == 'Backspace') {
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                timeNums[0] = timeNums[1];
                timeNums[1] = timeNums[2];
                timeNums[2] = timeNums[3];
                timeNums[3] = parseInt(event.key);
                console.log(timeNums);
            } else {
                timeNums[3] = timeNums[2];
                timeNums[2] = timeNums[1];
                timeNums[1] = timeNums[0];
                timeNums[0] = 0;
            }

            timeNums.forEach((e, index) => {
                nums[index].innerText = e;
            });
        }
    }

    document.getElementById('editTime').addEventListener('click', () => {
        isEditingTime = !isEditingTime;
        if (isEditingTime) {
            document.getElementById('startTimer').removeEventListener('click', countdownFunc);
            window.addEventListener('keydown', numFunc);
            document.querySelectorAll('.num').forEach((e) => {
                e.classList.add('animationClass');
            });
            document.querySelectorAll('.addTime').forEach((e) => {
                e.classList.add('buttonDisabled');
            });
            document.getElementById('startTimer').classList.add('buttonDisabled');
        } else {
            document.getElementById('startTimer').addEventListener('click', countdownFunc);
            window.removeEventListener('keydown', numFunc);
            document.querySelectorAll('.num').forEach((e) => {
                e.classList.remove('animationClass');
            });
            document.querySelectorAll('.addTime').forEach((e) => {
                e.classList.remove('buttonDisabled');
            });
            if (timeNums[0] == 0 && timeNums[1] == 0 && timeNums[2] == 0 && timeNums[3] == 0) {
            } else {
                document.getElementById('startTimer').classList.remove('buttonDisabled');
            }
        }
    });

    var countdownInterval;
    var isCounting = false;

    let countdownFunc = (event) => {
        isCounting = !isCounting;
        if (isCounting) {
            event.srcElement.innerHTML = `<span class="material-symbols-rounded">pause</span>`;
            document.getElementById('resetTimer').classList.add('buttonDisabled');
            countdownInterval = setInterval(countdown, 1000);
        } else {
            event.srcElement.innerHTML = `<span class="material-symbols-rounded">play_arrow</span>`;
            document.getElementById('resetTimer').classList.remove('buttonDisabled');
            clearInterval(countdownInterval);
        }
    };

    document.getElementById('startTimer').addEventListener('click', countdownFunc);

    function countdown() {
        if (timeNums[3] > 0) {
            timeNums[3] = timeNums[3] - 1;
        } else if (timeNums[2] > 0 || timeNums[1] > 0 || timeNums[0] > 0) {
            timeNums[3] = 9;
            if (timeNums[2] > 0) {
                timeNums[2] = timeNums[2] - 1;
            } else {
                timeNums[2] = 5;
                if (timeNums[1] > 0) {
                    timeNums[1] = timeNums[1] - 1;
                } else {
                    timeNums[1] = 9;
                    if (timeNums[0] > 0) {
                        timeNums[0] = timeNums[0] - 1;
                    } else {
                        timeNums[0] = 0;
                    }
                }
            }
        } else {
            timeNums.forEach((e, index) => {
                nums[index].innerText = e;
            });
            document.getElementById('startTimer').classList.add('buttonDisabled');
            document.getElementById('startTimer').innerHTML = `<span class="material-symbols-rounded">play_arrow</span>`;
            document.getElementById('resetTimer').classList.remove('buttonDisabled');
            clearInterval(countdownInterval);
        }
        timeNums.forEach((e, index) => {
            nums[index].innerText = e;
        });
    }

    document.querySelectorAll('.addTime').forEach((e) => {
        e.addEventListener('click', (event) => {
            if (event.srcElement.id == 'addFive') {
                console.log(5);
                timeNums[1] = timeNums[1] + 5;
                if (timeNums[1] > 9) {
                    timeNums[0] = timeNums[0] + 1;
                    timeNums[1] = timeNums[1] - 10;
                    if (timeNums[0] > 9) {
                        timeNums[0] = 9;
                        timeNums[1] = 5;
                    }
                }
            } else if (event.srcElement.id == 'addFifteen') {
                console.log(parseInt(timeNums[0].toString() + timeNums[1].toString()));
                if (parseInt(timeNums[0].toString() + timeNums[1].toString()) + 15 < 99) {
                    timeNums[1] = timeNums[1] + 5;
                    timeNums[0] = timeNums[0] + 1;
                    if (timeNums[1] > 9) {
                        timeNums[0] = timeNums[0] + 1;
                        while (timeNums[1] >= 10) {
                            timeNums[1] = timeNums[1] - 10;
                        }
                        if (timeNums[0] > 9) {
                            timeNums[0] = 9;
                            timeNums[1] = 5;
                        }
                    }
                }
            } else if (event.srcElement.id == 'addThirty') {
                if (timeNums[0] + 3 <= 9) {
                    timeNums[0] = timeNums[0] + 3;
                }
            }
            timeNums.forEach((e, index) => {
                nums[index].innerText = e;
            });
            document.getElementById('startTimer').classList.remove('buttonDisabled');
        });
    });

    document.getElementById('resetTimer').addEventListener('click', () => {
        timeNums = [0, 0, 0, 0];
        timeNums.forEach((e, index) => {
            nums[index].innerText = e;
        });
    });
}
