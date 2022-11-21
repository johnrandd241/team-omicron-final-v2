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
app.use(bodyParser.urlencoded({ extended: false }));

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * FROM users WHERE username = \'Tester1\';', (err, res) => {
    if (err) throw err;
    console.log(JSON.stringify(res));
    client.end();
});

//Loads and initializes pg library
const pgp = require('pg-promise')({
    //Initialization
});
//Prepares connection
const cn = 'postgres://username:password@host:port/database';
//Creates new database instance
const db = pgp(cn);
//Exports database object
export {db};

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

app.post('/user/addFriend', (req, res) => {
    // the request needs proof that this is indeed the user they claim to be
});

app.post('/user/removeFriend', (req, res) => {

});

app.post('/content/addPost', (req, res) => {
    // this request will need some kind of proof which user is making it
    // extract post type, title, desc, img, tags
    // add the post to the list of posts in the database, and also add the post to the list of posts made by this user
});

app.post('/content/removePost', (req, res) => {
    // 
});

app.get('/content/search', (req, res) => {

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







