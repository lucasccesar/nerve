/* ---------CRIAR TASKS--------- */

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjg1NjA4LCJpYXQiOjE3MDA2NDk2MDgsImp0aSI6Ijg4ZTFiZDRkODQ0MjRiOTQ4M2NlYWRmNDA2OWZmMmViIiwidXNlcl9pZCI6MTIsIm5hbWUiOiJMdWNhcyIsImxhc3RuYW1lIjoiQ2Fzc2lhbm8iLCJ1c2VybmFtZSI6Imx1Y2FzY2Nlc2FyIiwiZW1haWwiOiJmZHNAZ21haWwuY29tIn0.o-sKLss2d1Bfimp3wkRQkXwWiryLJRnoKWcCy_RmkKI';
let task = {
    title: 'eu sou viado',
    task_content: 'a atividade é q eu quero parar de ser viado',
    state: 'urgencia',
    worklist: true,
    date: '2023-11-29T23:30:00-03:00',
};
fetch('https://pi-kxis.onrender.com/api/task/', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(task) });

/* ---------RECEBER TASKS--------- */

let response1 = await fetch('https://pi-kxis.onrender.com/api/task/', { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.refresh.access}` } })
    .then(console.log('carregando'))
    .then((response) => response.json());

/* ---------CRIAR CONTA--------- */

let response2 = await fetch('https://pi-kxis.onrender.com/api/signup/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: e.target.name.value, lastname: e.target.lastName.value, username: e.target.usernameSignup.value, password: e.target.passwordSignin.value, email: e.target.emailSignin.value }),
})
    .then(console.log('carregando'))
    .then((response) => response.json());
console.log(response2.username);

/* ---------LOGAR CONTA--------- */

let emailUsername = e.target.emailLogin.value.indexOf('@') == -1 ? 'username' : 'email';
let object = { password: e.target.passwordLogin.value };
object[emailUsername] = e.target.emailLogin.value;
let response = await fetch('https://pi-kxis.onrender.com/api/login/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
});
let data = await response.json();
