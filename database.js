'use strict';
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
const cn = 'postregs://vuoyxzmwyzkavq:a4f5cc059f60dedb000bd8f405ca897fe3809c3632303a5d0df28cac882e4b20@ec2-34-230-153-41.compute-1.amazonaws.com:5432/d4l2404nskei9g';
//Creates new database instance baserd on connection details
const db = pgp(cn);
//Export db for shared use
module.exports = db;