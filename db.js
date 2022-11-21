const initOptions={
    //inti ops
};
//loads library
const pgp = require('pg-promise')(initOptions);
//Connection Setup
const cn = 'postgres://username:password@host:port/database';
//Create Database object
const db = pgp(cn);

module.exports = {
    pgp, db
};