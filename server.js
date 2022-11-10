const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//this section is for heroku, i believe it finds a port for the the deployment
//on heroku, then runs or something, otherwise itll run locally on localhost:8000 in your browser
// - John Rand
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
app.use(express.static(__dirname));
//const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/events", (req, res) => {// tag is /events due to it being the homepage
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login-page.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/profile.html");
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.sendFile(__dirname + "/profile.html");
  });

  app.post('/register', (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    res.sendFile(__dirname + "/profile.html");
  });

//for login page to redirect & such
 /*
//to redirect from index to login page
app.post("/login", (req, res) => {
    //let password = req.body.password-field;
    //res.send(username + password + ' Submitted Successfully!');
    //console.log(username);
    res.sendFile(__dirname + "/login-page.html");
    //let username = req.body.username-field;
    //let username = res.body.username-field;
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

app.post("/userprofilenew", (req, res) => { //added in at end of /userprofile the profile name itself
    //let username = req.body.username-field;
    //let password = req.body.password-field;
    //res.send(username + password + ' Submitted Successfully!');

    res.sendFile(__dirname + "/profile.html");
});

app.post("/logout", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
*/







