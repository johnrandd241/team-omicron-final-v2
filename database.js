export const DUMMY_POST = {title: 'This is the title of the post', img_src: 'www.com', desc: 'This is the description of the post', user: 'ch4rl3sd4rw1n', date: '10/5/22', id: 129839753759869, type: 'event'};
export const DUMMY_USER = {username: 'ch4rl3sd4rw1n', name: 'Charles Darwin', img_src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Charles_Darwin_seated_crop.jpg', bio: 'this is my biography, i have no family no friends no money no home no gall bladder and im starving and my dog died', posts: [123, 456, 789, 1234], friends: ['lemonman1', 'eggace4848', 'Hyn7eff']};

export function registerUser(username) {
    // basically, create an object like DUMMY_USER and store it in the database
    // here we need to create an entry for this new user in our database
    // set the profile pic to something default, the bio to something default, the name to something default
}

export function getPostByID(post_id) {
    // returns some object like DUMMY_POST
    return DUMMY_POST;
}

export function getUserByID(user_id) {
    // returns something like DUMMY_USER
    return DUMMY_USER;
}

export function getMessageLogByID(log_id) {

}

export function removeFriend(logged, session, to_remove) {
    // logged is the username of the person who is doing the removing (the one whose signed in)
    // session is the session id of the logged user, this will be double checked before the removal happens to see if its legit
    // to_remove is the username of the friend to be removed
}

export function addFriend(logged, session, to_add) {
    // logged is the username of the person who is doing the adding (the one whose signed in)
    // session is the session id of the logged user, this will be double checked before the adding happens to see if its legit
    // to_remove is the username of the friend to be added
}

export function createPost(logged, session, title, desc, tags, img_src) {
    // verify user is legit
    // create new row in post table with this info
}

export function deletePost(logged, session, post_id) {
    // make sure user is real, legit
    // remove the row corresponding to the post_id
}

export function createComment(logged, session, log_id, text) {
    // vailidate the logged user (check the session matches the stuff on back end)
    // add the text to the message log with log_id
}

export function getAllPosts() {
    // literally just returns all the posts from the database, i will filter through them in the search() function in main.js
}

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * FROM users;', (err, res) => {
    if (err) throw err;
    console.log('Connection SUccess\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
    console.log(JSON.stringify(res));
    client.end();
});