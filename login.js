const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "test" && password === "test") {
        alert("You have successfully logged in.");
        //redirect to profile with profile logged in
        window.location.replace("profile.html");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})