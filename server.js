const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json({extended: true, limit: '1mb'}));

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

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
});

// Loading and initializing the library:
const pgp = require('pg-promise')({
    // Initialization Options
});
// Preparing the connection details:
const cn = 'postgres://username:password@host:port/database';
// Creating a new database instance from the connection details:
const db = pgp(cn);
// Exporting the database object for shared use:
module.exports = db;

app.get("/query", (req, res)=>{
    const q = req.params;
    db.any(q)
    .then(resp => {
        res.json({"Response":resp});
    })
    .catch(error => {
        // error;
    });
});

let username = null;
let password = null;
let fName = null;
let lName = null;
let email = null;
let isAuth = false;

//Gets login page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login-page.html");
});
//Gets current data for client files to use
app.get("/sendLoginCred", (req, res) => {
    res.json({"username": username, 
               "isAuth": isAuth});
});
//Authorizes user
app.post("/login/auth", (req, res) => {
    username = req.body.username;
    password = req.body.password;
    

        //if not null
        if(username !== null && password !== null){
            //check in db if it matches
            if(username === 'admin'){
                isAuth = true;
            //if not in db, reset user and pass values and redirect to login
            }else{
                username = null;
                password = null;
            }
        //if null 
        }else{
            username = null;
            password = null;
        }
        res.json({"username": username, 
         "isAuth": isAuth});
        console.log(username + password + isAuth);

});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.post("/register/auth", (req, res) => {
    fName = req.body.fName;
    lName = req.body.lName;
    email = req.body.email;
    username = req.body.username;
    password = req.body.password;
    

        //if not null
        if(username !== null && password !== null &&
            fName !== null && lName !== null && email !== null){
            //check in db if it matches
            if(username === 'admin'){
                isAuth = true;
            //if not in db, reset user and pass values and redirect to login
            }else{
                fName = null;
                lName = null;
                email = null;
                username = null;
                password = null;
            }
        //if null 
        }else{
            fName = null;
            lName = null;
            email = null;
            username = null;
            password = null;
        }
        res.json({"username": username, 
         "isAuth": isAuth});

        console.log(username + password + isAuth);
});

app.get("/events", (req, res) => {// tag is /events due to it being the homepage
    res.sendFile(__dirname + "/index.html");
});




app.get("/profile", (req, res) => {
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








