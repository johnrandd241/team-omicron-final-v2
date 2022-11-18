'use strict';
/* function createUser(username, name){

}

function updateUser(id, bio){

}

function updateUserPosts(id, postid, addremv){

}

function updateFriends(id, fid, addrmv){

}

function deleteUser(username){

}

function createPost(id, title, date){

}

function updatePost(id, title, date, comments){

}

function deletePost(id){

}

function getPost(id){

}

function searchPosts(tags){
    
}

function getMSGLog(logid, user){

}

function createMSGLog(postid){

}

function updateMSGLog(logid){

}
 */

//Database connection code
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

//Load and intialize library
const pgp = require('pg-promise')({//Intilization Options
});
//Connection details prep
const cn = 'postregs://username:password@host:port/database';
//Creates new database instance baserd on connection details
const db = pgp(cn);
//Export db for shared use
module.exports = db;