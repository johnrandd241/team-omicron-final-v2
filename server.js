const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
console.log(bodyParser.urlencoded({ extended: false }));

//this section is for heroku, i believe it finds a port for the the deployment
//on heroku, then runs or something, otherwise itll run locally on localhost:8000 in your browser
// - John Rand
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
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

app.get("/GetMsgFromUser", (req, res)=>{
    const user = req.params;
    const q = `SELECT messages FROM users WHERE Username = ${user};`;
    console.log(q);
    db.any(q)
    .then(resp => {
        console.log(resp);
        res.json({"Response":resp});
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

app.get("/GetMsgFromID", (req, res)=>{
    const chatID = req.params;
    const q = `SELECT * FROM messagelog where ID = ${chatID};`;
    console.log(q);
    db.any(q)
    .then(resp => {
        res.json({"Response":resp.rows});
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

app.get("/posts", (req, res)=>{
    const q = `SELECT * FROM posts ORDER BY post.creationDate DESC;`;
    db.any(q)
    .then(resp => {
        res.json({"Response":resp.rows});
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

app.get("/users", (req, res)=>{
    const q = "SELECT * FROM users;";
    db.any(q)
    .then(resp => {
        console.log(resp.rows);
        res.json({"Response":resp.rows});
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});
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







