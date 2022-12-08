export let username = '';
export let password = '';
document.getElementById('loginButton').addEventListener('click', (e) => {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    
});