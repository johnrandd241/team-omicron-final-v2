const initOptions={
    //inti ops
};
//import pgPromise from '/node_modules/pg-promise';//'./node_modules/pg-promise/typescript/pg-promise.d.ts';
//loads library
const pgp = require('pg-promise')(initOptions);
//import pgp from 'pg-promise';
//const pgp = pgPromise(initOptions);
//Connection Setup
const cn = 'postgres://username:password@host:port/database';
//Create Database object
export const db = pgp(cn);
