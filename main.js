// import {db} from './db.js';
import { renderChat } from "./messages.js";
import {message} from './messages.js';

let cur_section = 'events'; // we open the events section by default, this variable keeps track of which section we have open
const POSTS_PER_ROW = 3;

// hopefully john rand can set these variables upon logging in
export let session_id = 'the_session_id_administered_by_the_server_upon_login', logged_user = 'usernameofuserloggedin';

function getColumnForPost(post_data) {
    let cur_col = document.createElement('div');
    cur_col.classList.add('col');
    cur_col.classList.add('p-' + POSTS_PER_ROW);
    cur_col.classList.add('bg-white');
    let title_element = document.createElement('h2');
    title_element.classList.add('hoverline');
    title_element.addEventListener('click', () => {
        cur_section = 'postview';
        toggleSearchBar();
        deactivateNavs();
        viewPost(post_data.id);
    });
    title_element.innerHTML = post_data.title;
    let img_element = document.createElement('img');
    img_element.src = post_data.img_src;
    img_element.classList.add('post-image');
    img_element.classList.add('img-responsive');
    let desc_element = document.createElement('p');
    desc_element.innerHTML = post_data.desc; // .substring(0, 100);
    let meta_element = document.createElement('p');
    meta_element.innerHTML = 'Posted by ' + Database.getUserByID(post_data.user).name + ' on ' + post_data.date;
    cur_col.appendChild(title_element);
    cur_col.appendChild(img_element);
    cur_col.appendChild(desc_element);
    cur_col.appendChild(meta_element);
    return cur_col;
}

// if search button is pressed and the search text is blank, just return everything from that section, sorted by date
function search(keywords) {
    // obtain stuff from database (based on cur_section and keywords)
    // programatically create the html that displays the post (the response from the database)
    // render the elements into the page
    // at this point, all of the 'posts' should be in some kind of array, all we gotta do now is render them
    let arr = Array(5).fill(0).map(e => Database.DUMMY_POST); 
    // create the base element for the posts (this container holds the rows and columns and what not)
    let container = document.createElement('div');
    container.classList.add('container'); // specify the fact it is a container
    container.classList.add('mt-5'); // set the size
    // while there are still posts to render
    while (arr.length > 0) {
        // create the element for this row of posts
        let cur_row = document.createElement('div');
        cur_row.classList.add('row'); // specify that it is a row
        cur_row.classList.add('gx-5'); // set the sizing
        // go through them POSTS_PER_ROW at a time (i think 2 posts per row is good)
        arr.slice(0, POSTS_PER_ROW).forEach(post_data => {
            // create the column cell for the post
            cur_row.appendChild(getColumnForPost(post_data));
            arr.shift();
        });
        container.appendChild(cur_row);
    }
    document.getElementById('page').textContent = '';
    document.getElementById('page').appendChild(container);
}

function viewPost(post_id) {
    let container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    let primary_row = document.createElement('div');
    primary_row.classList.add('row');
    let comments = document.createElement('div');
    comments.classList.add('col');
    comments.classList.add('bg-white');
    let comments_header = document.createElement('h2');
    comments_header.innerHTML = 'Comments';
    // TODO STILL: write in all the comments on the post, we just have to fetch these from the Database and then probably fill them into p elements or something
    comments.appendChild(comments_header);
    primary_row.appendChild(getColumnForPost(Database.getPostByID(post_id)));
    primary_row.appendChild(comments);
    container.appendChild(primary_row);
    document.getElementById('page').textContent = '';
    document.getElementById('page').appendChild(container);
}

function toggleSearchBar() {
    // now depending on which tab we switched to, we might have to hide/show the search form
    let search_form = document.getElementById('search-nav');
    if (['events', 'people', 'records'].includes(cur_section)) {
        // show search form
        search_form.style.display = 'block';
    } else {
        // hide search form
        search_form.style.display = 'none';
    }
}

// runs when message tab is clicked

function postCreator() {
    document.getElementById('page').textContent = 'post creator';
}

// runs when profile tab is clicked
function profile(user_id) {
    let is_own = user_id === logged_user; // is true if you are viewing your own profile
    // this function generates the profile page into the body, which may appear different whether you are viewing your own or someone elses
    // do some kind of check to see if user_id is the one thats signed in
    // if it is, add the buttons that allow them to edit the bio
    // fetch the user information
    let user_data = Database.getUserByID(user_id);
    // now create the html elements
    let container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');
    let row = document.createElement('div');
    row.classList.add('row');
    let personal_col = document.createElement('div');
    personal_col.classList.add('col');
    personal_col.classList.add('p-2');
    personal_col.classList.add('bg-white');
    let sub_personal = document.createElement('div');
    sub_personal.classList.add('container');
    let sub_personal_row = document.createElement('div');
    sub_personal_row.classList.add('row');
    let sub_personal_left = document.createElement('div');
    sub_personal_left.classList.add('col');
    sub_personal_left.classList.add('p-2');
    let header2 = document.createElement('h2');
    header2.innerHTML = user_data.name;
    let header3 = document.createElement('h3');
    header3.classList.add('text-muted');
    header3.innerHTML = '@' + user_data.username;
    let biography;
    if (is_own) {
        biography = document.createElement('textarea');
        biography.style.width = '100%';
        biography.value = user_data.bio;
    } else {
        biography = document.createElement('p');
        biography.innerHTML = user_data.bio;  
    }
    let sub_personal_right = document.createElement('div');
    sub_personal_right.classList.add('col');
    sub_personal_right.classList.add('p-2');
    let friends = document.createElement('div');
    let post_creator_head = document.createElement('h2');
    post_creator_head.innerHTML = 'Create';
    let post_creator_p = document.createElement('p');
    post_creator_p.innerHTML = 'Click here to go to the post creator';
    post_creator_p.classList.add('hoverline');
    post_creator_p.addEventListener('click', () => {
        cur_section = 'postCreator';
        toggleSearchBar();
        deactivateNavs();
        postCreator();
    });
    let friends_header = document.createElement('h2');
    friends_header.innerHTML = "Friends";
    friends.appendChild(friends_header);
    user_data.friends.map(friend_id => Database.getUserByID(friend_id)).forEach(friend_data => {
        let friend_item = document.createElement('p');
        friend_item.classList.add('hoverline');
        friend_item.innerHTML = friend_data.name + ' @' + friend_data.username;
        if (is_own) {
            let unfriend_button = document.createElement('input');
            unfriend_button.type = 'button';
            unfriend_button.value = 'Remove';
            unfriend_button.addEventListener('click', () => {
                Database.removeFriend(logged_user, session_id, friend_data.username);
            });
            friend_item.appendChild(unfriend_button);
        }
        friend_item.addEventListener('click', () => {
            cur_section = 'profile';
            toggleSearchBar();
            profile(friend_data.username);
        });
        friends.appendChild(friend_item);
    });
    if (user_data.friends.length === 0) {
        let no_friends = document.createElement('p');
        no_friends.innerHTML = 'This user has no friends';
        friends.appendChild(no_friends);
    }
    let photo = document.createElement('img');
    photo.classList.add('img-responsive');
    photo.classList.add('profile-pic');
    let history_col = document.createElement('div');
    history_col.classList.add('col');
    history_col.classList.add('p-2');
    history_col.classList.add('bg-white');
    let history_header = document.createElement('h2');
    history_header.innerHTML = 'History';
    photo.src = user_data.img_src;
    sub_personal_left.appendChild(header2);
    sub_personal_left.appendChild(header3);
    sub_personal_left.appendChild(biography);
    if (is_own) {
        let submit_bio_button = document.createElement('input');
        submit_bio_button.type = 'button';
        submit_bio_button.value = 'Update';
        sub_personal_left.appendChild(submit_bio_button);
    }
    sub_personal_right.appendChild(photo);
    sub_personal_row.appendChild(sub_personal_left);
    sub_personal_row.appendChild(sub_personal_right);
    sub_personal.appendChild(sub_personal_row);
    personal_col.appendChild(sub_personal);
    personal_col.appendChild(post_creator_head);
    personal_col.appendChild(post_creator_p);
    personal_col.appendChild(friends);
    row.appendChild(personal_col);
    history_col.appendChild(history_header);
    user_data.posts.forEach(post_id => {
        [].slice.call(getColumnForPost(Database.getPostByID(post_id)).children).forEach(childElem => {
            history_col.appendChild(childElem);
        });
    });
    if (user_data.posts.length === 0) {
        let no_posts = document.createElement('p');
        no_posts.innerHTML = 'This user has no posts';
        history_col.appendChild(no_posts);
    }
    row.appendChild(history_col);
    container.appendChild(row);
    document.getElementById('page').textContent = '';
    document.getElementById('page').appendChild(container);
}

function deactivateNavs() {
    document.getElementById('nav-list').querySelectorAll('a').forEach(e => e.classList.remove('active'));
}

window.onload = function() {
    // when search button is pressed
    document.getElementById('search-button').addEventListener('click', function() {
        // what section to search?
        search(document.getElementById('search-text').value);
    });

    // add functionality to when nav links are clicked
    document.getElementById('nav-list').querySelectorAll('a').forEach(link_elem => {
        link_elem.addEventListener('click', function() {
            // deactivate the current active link (achieved by deactivating all of them)
            deactivateNavs();
            // set the clicked link to active
            link_elem.classList.add('active');
            // update the current section
            cur_section = link_elem.id.split('-')[0];
            toggleSearchBar();
            // now we do whatever we need to based on the section we are in
            switch (cur_section) {
                case 'messages':
                    // do whatever we need for the messages
                    message();
                    break;
                case 'profile':
                    // do whatever we need for the profile
                    // go to the current signed in user (this should only even be visible if youre signed in)
                    profile(logged_user);
                    break;
                default:
                    // must be events, people, or records, which are basically all the same
                    // jsut do a default search to sort by date
                    search('');
                    break;
            }
        });
    });

    // sort posts by date into the page
    search('');
};