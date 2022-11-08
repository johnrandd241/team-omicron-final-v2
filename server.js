const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//this section is for heroku, i believe it finds a port for the the deployment
//on heroku, then runs or something, otherwise itll run locally on localhost:8000 in your browser
// - John Rand
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log();
});

//for login page to redirect & such
 
//to redirect from index to login page
app.post("/login", (req, res) => {
    res.sendFile(__dirname + "/login-page.html");
});

app.post("/userprofile", (req, res) => {
    //let username = req.body.username-field;
    //let password = req.body.password-field;
    //res.send(username + password + ' Submitted Successfully!');

    res.sendFile(__dirname + "/profile.html");
});
//to redirect from index to register page
app.post("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});






