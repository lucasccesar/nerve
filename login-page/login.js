import { jwtDecode } from '../node_modules/jwt-decode/build/esm/index.js';

let user = JSON.parse(localStorage.getItem('user'));

if (user == null) {
    const form = document.querySelector('#formDiv');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const login = document.getElementById('login');
    const signin = document.getElementById('signin');
    login.addEventListener('transitionend', changeDelay);
    let x = 1;
    const change = document.getElementById('change');
    const inputs = document.querySelectorAll('input');
    inputs.forEach((e) => {
        e.addEventListener('focus', moveLabelFocus);
        e.addEventListener('focusout', moveLabelFocusOut);
    });
    const createAccount = document.getElementById('createAccount');
    const loginAccount = document.getElementById('loginAccount');
    createAccount.addEventListener('click', sla);
    loginAccount.addEventListener('click', sla);
    const loginText = document.getElementById('loginText');
    const createText = document.getElementById('createText');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let password = document.getElementById('passwordSignin').value;
        let passwordConfirm = document.getElementById('confirmPassword').value;

        if (password != passwordConfirm) {
        } else {
            let tokens = localStorage.getItem('authTokens');

            if (!tokens) {
                let response = await fetch('https://pi-kxis.onrender.com/api/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: e.target.name.value, lastname: e.target.lastName.value, username: e.target.usernameSignup.value, password: e.target.passwordSignin.value, email: e.target.emailSignin.value }),
                }).then((document.querySelector('#createAccountLabel').innerHTML = '<svg class="loading" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" /></svg>'));
                let a = await response.json();

                if (a.hasOwnProperty('username')) {
                    document.querySelector('#usernameSignup').parentElement.style.borderBottom = '1px solid red';
                    document.querySelector('#signupForm .inputWrapper p').style.display = 'inline-block';
                    document.querySelector('#signupForm .inputWrapper p').innerText = 'Esse nome de usuário já existe';
                    document.getElementById('createAccountLabel').innerHTML = 'Criar Conta';
                } else if (a.hasOwnProperty('email')) {
                    document.querySelector('#emailSignin').parentElement.style.borderBottom = '1px solid red';
                    document.querySelector('#signupForm .inputWrapper p').style.display = 'inline-block';
                    document.querySelector('#signupForm .inputWrapper p').innerText = 'Email inválido';
                    document.getElementById('createAccountLabel').innerHTML = 'Criar Conta';
                }

                console.log(response.status);

                if (response.status == 201) {
                    window.location = 'account-created.html';
                }
            }
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let tokens = localStorage.getItem('authTokens');
        if (!tokens) {
            let emailUsername = e.target.emailLogin.value.indexOf('@') == -1 ? 'username' : 'email';
            let object = { password: e.target.passwordLogin.value };
            object[emailUsername] = e.target.emailLogin.value;
            let response = await fetch('https://pi-kxis.onrender.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            })
                .then((document.getElementById('enterAccountLabel').innerHTML = '<svg class="loading" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" /></svg>'))
                .then((response) => {
                    return response;
                });
            let data = await response.json();

            if (response.status === 201) {
                localStorage.setItem('authTokens', JSON.stringify(data));
                let tokens = JSON.parse(localStorage.getItem('authTokens'));
                let token = tokens['refresh'];
                let token_access = JSON.stringify(token.access);
                localStorage.setItem('user', JSON.stringify(jwtDecode(token_access)));
                window.location = 'tasks.html';
            } else {
                document.querySelectorAll('#formDiv #loginForm .input').forEach((e) => {
                    e.style.borderBottom = '1px solid red';
                });
                document.querySelector('#loginForm .inputWrapper p').style.display = 'inline-block';
                document.getElementById('enterAccountLabel').innerHTML = 'Entrar';
            }
        }
    });

    function changeDelay() {
        if ((x / 4) % 4 == 1) {
            signin.style.transitionDelay = '0ms';
            login.style.transitionDelay = '125ms';
        }
        if ((x / 4) % 4 == 2) {
            signin.style.transitionDelay = '125ms';
            login.style.transitionDelay = '0ms';
            x = 0;
        }
        x++;
    }

    function moveLabelFocus(event) {
        if (event.target.id != 'submit') {
            if (event.target.parentElement.parentElement.firstElementChild.innerText != 'Entrar' && event.target.parentElement.parentElement.firstElementChild.innerText != 'Registrar-se') {
                event.target.parentElement.parentElement.firstElementChild.style.transform = `translateY(-24px)`;
                event.target.parentElement.parentElement.firstElementChild.style.fontSize = `14px`;
                event.target.parentElement.style.borderBottom = '1px solid white';
                document.querySelector('#loginForm .inputWrapper p').style.display = 'none';
                document.querySelector('#signupForm .inputWrapper p').style.display = 'none';
            }
        }
    }

    function moveLabelFocusOut(event) {
        if (event.target.value != '' || event.target.type == 'date') {
        } else {
            event.target.parentElement.parentElement.firstElementChild.style.transform = `translateY(0px)`;
            event.target.parentElement.parentElement.firstElementChild.style.fontSize = `19px`;
            event.target.parentElement.style.borderBottom = '1px solid white';
            document.querySelector('#loginForm .inputWrapper p').style.display = 'none';
            document.querySelector('#signupForm .inputWrapper p').style.display = 'none';
        }
    }

    function sla() {
        if (form.style.left != '50%') {
            form.style.left = '50%';
            change.style.left = '-50%';
            login.style.opacity = '0%';
            login.style.visibility = 'hidden';
            signin.style.opacity = '100%';
            signin.style.visibility = 'visible';
            loginText.style.opacity = '0%';
            loginText.style.visibility = 'hidden';
            createText.style.opacity = '100%';
            createText.style.visibility = 'visible';
        } else {
            form.style.left = '0%';
            change.style.left = '0%';
            signin.style.opacity = '0%';
            signin.style.visibility = 'hidden';
            login.style.opacity = '100%';
            login.style.visibility = 'visible';
            createText.style.opacity = '0%';
            createText.style.visibility = 'hidden';
            loginText.style.opacity = '100%';
            loginText.style.visibility = 'visible';
        }
    }
} else {
    window.location = 'tasks.html';
}
