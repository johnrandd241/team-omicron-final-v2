const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//John made - for his login page to redirect & such
 
//to redirect from index to login page
app.post("/login", (req, res) => {
    res.sendFile(__dirname + "/login-page.html");
});

//to redirect from index to register page
app.post("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});




//John made - for his login page to redirect & such

