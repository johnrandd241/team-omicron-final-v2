const loginForm = document.getElementById("login-form");
const registerButton = document.getElementById("login-form-register");
const loginErrorMsg = document.getElementById("login-error-msg");
registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    alert("Account successfully created!");
    window.location.replace("profile.html");

})