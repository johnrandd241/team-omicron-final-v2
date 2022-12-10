const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
const cn = {
    host:'ec2-34-230-153-41.compute-1.amazonaws.com',
    ports:5432,
    user:'vuoyxzmwyzkavq',
    password:'a4f5cc059f60dedb000bd8f405ca897fe3809c3632303a5d0df28cac882e4b20',
    database:'d4l2404nskei9g',
    ssl: {
        rejectUnauthorized:false
    }
};
//const cn = "postgres://vuoyxzmwyzkavq:a4f5cc059f60dedb000bd8f405ca897fe3809c3632303a5d0df28cac882e4b20@ec2-34-230-153-41.compute-1.amazonaws.com:5432/d4l2404nskei9g?ssl=true";
// Creating a new database instance from the connection details:
const db = pgp(cn);
// Exporting the database object for shared use:
module.exports = db;

app.get("/GetMsgFromUser", (req, res)=>{
    const user = req.query.user;
    const q = `SELECT messages FROM users WHERE Username = ${user};`;
    db.any(q)
    .then(resp => {
        console.log(resp);
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});
//--------------------------------
app.get('/CreateCommentSection', (req, res)=>{
    const logid = req.query.logid;
    const postid = req.query.postid;
    const q = `INSERT INTO logs (logID) VALUES (${logid}); 
                INSERT INTO commentlog(clogid) VALUES (${logid});
                UPDATE posts
                SET comments = ${logid}
                WHERE postid = ${postid};`
    bd.none(q)
    .then(resp => {
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

app.get("/GetMsgFromID", (req, res)=>{
    const chatID = req.query.chatID;
    const q = `SELECT * FROM messagelog where mlogid = ${chatID};`;
    db.any(q)
    .then(resp => {
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});



app.get("/posts", (req, res)=>{
    const q = `SELECT * FROM post ORDER BY post.creationDate DESC;`;
    db.any(q)
    .then(resp => {
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

app.get("/posts/create", (req, res) => {
    const q = `INSERT INTO post (comments, creationdate, imgurl, postdescription, postid, posttype, tags, title, userid) VALUES (${req.params['comments']}, GETDATE(), ${req.params['imgurl']}, ${req.params['postdescription']}, ${req.params['postid']}, ${req.params['posttype']}, ${req.params['tags']}, ${req.params['title']}, ${req.params['userid']});`;
    db.none(q).then(resp => {
        console.log('post created');
    }).catch(error => {
        console.log('error while making post' + error);
    });
    res.send({});
});

app.get("/users", (req, res)=>{
    const q = "SELECT * FROM users;";
    db.any(q)
    .then(resp => {
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});


app.get("/users/get", (req, res) => {
    const q = `SELECT * FROM users WHERE username=${req.params['userid']};`;
    db.any(q)
    .then(resp => {
        res.json(resp);
    })
    .catch(error => {
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        res.end();
    });
});

let username = null;
let password = null;
let email = null;
let isAuth = false;
let fullName = null;
let bio = null;
let friends = [];
let imgurl = null;

let user = {"user":{
                'email': email,
                "username": username,
                "password": password, 
                "isAuth": isAuth,
                "fullName": fullName,
                "bio": bio,
                "friends": friends,
                "imgurl": imgurl
}};
app.get("/events", (req, res) => {// tag is /events due to it being the homepage
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login-page.html");
});

app.get("/logout", (req, res) => {
    user = {"user":{
        'email': null,
        "username": null,
        "password": null, 
        "isAuth": false, 
        "fullName": null,
        "bio": null,
        "friends": null,
        "imgurl": null        
    }};
    res.redirect("/events");
});

//Gets current data for client files to use
app.get("/sendLoginCred", (req, res) => {
    res.json({"username": user.username, 
               "isAuth": user.isAuth});
});
app.get("/sendAllCred", (req, res) => {
    res.json(user);
});
//Authorizes user
app.post("/login/auth", (req, res) => {
    //user.username = req.body.username;
    //user.password = req.body.password;
    
    const q = "SELECT * FROM users WHERE Username = '" + req.body.username + "' and pword = '" + req.body.password + "';";
    //if(user.username !== null && user.password !== null){
    db.any(q)
    .then(resp => {//successfully returns user variables
        //console.log(resp[0].username);
        user.isAuth = true;
        user.email = resp[0].email;
        user.username = resp[0].username;
        user.password = resp[0].pword;
        user.fullName = resp[0].nameofuser;
        user.bio = resp[0].bio;
        user.friends = resp[0].friends;
        user.imgurl = resp[0].imgurl;

        res.json({"username": user.username, 
                  "isAuth": user.isAuth,
                  'email': user.email,
                  "password": user.password, 
                  "fullName": user.fullName,
                  "bio": user.bio,
                  "friends": user.friends,
                  "imgurl": user.imgurl
                 });

    })
    .catch(error => {//unsuccessfully finds user with specified credentials
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        console.log(user);

        user.username = null;
        user.password = null;
        user.isAuth = false;
        res.json({"username": user.username, 
        "isAuth": user.isAuth,
        'email': user.email,
        "password": user.password, 
        "fullName": user.fullName,
        "bio": user.bio,
        "friends": user.friends,
        "imgurl": user.imgurl
       });
        //res.end();
    });
    
    /*
        //if not null
        if(user.username !== null && user.password !== null){
            //check in db if it matches
            if(user.username === 'admin'){
                //get all user fields from db and update user var
                user.isAuth = true;
            //if not in db, reset user and pass values and redirect to login
            }else{
                user.username = null;
                user.password = null;
            }
        //if null 
        }else{
            user.username = null;
            user.password = null;
        }
        res.json({"username": user.username, 
         "isAuth": user.isAuth});
        */
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});
//`INSERT INTO logs (logID) VALUES (${logid}); 
   //             INSERT INTO commentlog(clogid) VALUES (${logid});
app.post("/register/auth", (req, res) => {
    console.log("called reg");
    const q = "SELECT EXISTS(SELECT username, email FROM users WHERE username = '" + req.body.username + "' OR email = '" + req.body.email + "');";
    db.any(q)
    .then(resp => {//if q returns 1 it means username or email already exist
                    // in user table, so 
        console.log(resp);
        if(resp[0].exists){
            console.log("username or email already exists");
            user.username = null;
            user.password = null;
        }else{//if it doesnt exist, proceed with creating data
            console.log("made it past user checker");
            //here lies issue, must be the call to the db
            //INSERT INTO users (username, pword, fullName, email) VALUES '" + req.body.username+"','" + req.body.password+"','" +req.body.fullName +"','" + req.body.email +"';
            const createUser = "INSERT INTO users (username, pword, nameofuser, email) VALUES ('" + req.body.username+"','" + req.body.password+"','" +req.body.fullName +"','" + req.body.email +"');";

            db.none(createUser)
            .then(resp => {
                user.isAuth = true;
                user.email = req.body.email;
                user.username = req.body.username;
                user.password = req.body.password;
                user.fullName = req.body.fullName;
                user.bio = user.bio;
                user.friends = user.friends;
                user.imgurl = user.imgurl;
        
            })
            .catch(error => {
                console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
                console.log(error);

            });
/*
            db.any(createUser)
            .then(resp => {
                user.isAuth = true;
                user.email = req.body.email;
                user.username = req.body.username;
                user.password = req.body.password;
                user.fullName = req.body.fullName;

                res.json({"username": user.username, 
                "isAuth": user.isAuth,
               'email': user.email,
               "password": user.password, 
               "fullName": user.fullName,
               "bio": user.bio,
               "friends": user.friends,
               "imgurl": user.imgurl
               });
            })    
            .catch(error => {//unsuccessfully finds user with specified credentials
            console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
            console.log(error);
            user.username = null;
            user.password = null;
            //res.end();
    });


          */      


        }
    })
    .catch(error => {//unsuccessfully finds user with specified credentials
        console.log("An error occured in the SQL call to the server. Dumping Error now...\n");
        console.log(error);
        user.username = null;
        user.password = null;
        //res.end();
    });
    

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








