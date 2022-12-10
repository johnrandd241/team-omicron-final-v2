// import {db} from './db.js';
import  {checkUserLogin, createUser, user} from './user.js';
import {message} from './messages.js';
import * as Database from './database.js';

let currentUser = loadUser();
console.log(currentUser);

let cur_section = 'events'; // we open the events section by default, this variable keeps track of which section we have open
const POSTS_PER_ROW = 3;
// hopefully john rand can set these variables upon logging in
export let session_id = 'the_session_id_administered_by_the_server_upon_login', logged_user = 'sbrommage1';

function getColumnForPost(post_data) {
    let cur_col = document.createElement('div');
    cur_col.classList.add('col');
    cur_col.classList.add('p-' + POSTS_PER_ROW);
    cur_col.classList.add('bg-white');
    let title_element = document.createElement('h2');
    title_element.classList.add('hoverline');
    if (post_data.postid != 0) { // id changed to postid
        title_element.addEventListener('click', () => {
            cur_section = 'postview';
            toggleSearchBar();
            deactivateNavs();
            viewPost(post_data.postid); // id changed to postid
        });
    }
    title_element.innerHTML = post_data.title; // title same
    let img_element = document.createElement('img');
    img_element.src = post_data.imgurl; // img_src changed to imgurl
    img_element.classList.add('post-image');
    img_element.classList.add('img-responsive');
    let desc_element = document.createElement('p');
    desc_element.innerHTML = post_data.postdescription; // .substring(0, 100); // desc changed to postdescription
    let meta_element = document.createElement('p');
    meta_element.innerHTML = 'Posted by ' + post_data.userid + ' on ' + post_data.creationdate; // creationdate changed to date
    /*
    let userfetch = await fetch("/users/get?userid=" + post_data.userid);
    userfetch.json().then(delivered => {
        meta_element.innerHTML = 'Posted by ' + delivered[0].nameofuser + ' on ' + post_data.creationdate; // creationdate changed to date
    });
    */
    meta_element.style.textDecoration = 'underline';
    if (post_data.postid != 0) {
        meta_element.addEventListener('click', () => {
            cur_section = 'profile';
            toggleSearchBar();
            deactivateNavs();
            profile(post_data.userid); // changed user to userid
        });
    }
    cur_col.appendChild(title_element);
    cur_col.appendChild(img_element);
    cur_col.appendChild(desc_element);
    cur_col.appendChild(meta_element);
    return cur_col;
}

// if search button is pressed and the search text is blank, just return everything from that section, sorted by date
async function search(keywords) {
    // obtain stuff from database (based on cur_section and keywords)
    // programatically create the html that displays the post (the response from the database)
    // render the elements into the page
    // at this point, all of the 'posts' should be in some kind of array, all we gotta do now is render them
    let data = await fetch("/posts");
    data.json().then(arr => { // let arr = Array(5).fill(0).map(e => Database.DUMMY_POST);
        arr = arr.filter(e => cur_section.startsWith(e.posttype));
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
    });
}

async function viewPost(post_id) {
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
    let post_data = await fetch("posts/get?postid=" + post_id);
    console.log("attempting to view post with id " + post_id);
    console.log(post_data);
    post_data.json().then(true_data => {
        console.log("got the post data, now rendering: ");
        console.log(true_data);
        console.log(true_data[0]);
        primary_row.appendChild(getColumnForPost(true_data[0]));
        primary_row.appendChild(comments);
        container.appendChild(primary_row);
        document.getElementById('page').textContent = '';
        document.getElementById('page').appendChild(container);
    });
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
    document.getElementById('page').textContent = '';
    let editor_table = document.createElement('div');
    editor_table.classList.add('container');
    editor_table.classList.add('mt-5');
    let row = document.createElement('div');
    row.classList.add('row');
    let editor_column = document.createElement('div');
    editor_column.classList.add('col');
    let editor_header = document.createElement('h2');
    editor_header.innerHTML = 'Editor';
    editor_column.appendChild(editor_header);
    editor_column.classList.add('col');
    editor_column.classList.add('bg-white');
    let form_element = document.createElement('form');
    let form_div = document.createElement('div');
    form_div.classList.add('form-group');
    let title_label = document.createElement('label');
    title_label.innerHTML = 'Title';
    let title_input = document.createElement('input');
    title_input.type = 'text';
    title_input.id = 'postMakerTitle';
    title_input.classList.add('form-control');
    let desc_label = document.createElement('label');
    desc_label.innerHTML = 'Description';
    let desc_input = document.createElement('textarea');
    desc_input.id = 'postMakerDesc';
    desc_input.classList.add('form-control');
    let url_label = document.createElement('label');
    url_label.innerHTML = 'Image URL';
    let url_input = document.createElement('input');
    url_input.classList.add('form-control');
    url_input.type = 'text';
    url_input.id = 'postMakerUrl';
    let tags_label = document.createElement('label');
    tags_label.innerHTML = 'Tags (comma separated)';
    let tags_input = document.createElement('input');
    tags_input.classList.add('form-control');
    tags_input.type = 'text';
    tags_input.id = 'postMakerTags';
    let category_label = document.createElement('label');
    category_label.innerHTML = 'Category';
    let category_select = document.createElement('select');
    category_select.classList.add('form-control');
    category_select.id = 'postMakerType';
    let event_option = document.createElement('option');
    event_option.innerHTML = 'Events';
    event_option.value = 'event';
    category_select.appendChild(event_option);
    let people_option = document.createElement('option');
    people_option.innerHTML = 'People';
    people_option.value = 'people';
    category_select.appendChild(people_option);
    let record_option = document.createElement('option');
    record_option.innerHTML = 'Records';
    record_option.value = 'record';
    category_select.appendChild(record_option);
    let submit_button = document.createElement('button');
    submit_button.type = 'button';
    submit_button.innerHTML = 'Submit';
    form_element.onsubmit = "return false";
    form_div.appendChild(title_label);
    form_div.appendChild(title_input);
    form_div.appendChild(desc_label);
    form_div.appendChild(desc_input);
    form_div.appendChild(url_label);
    form_div.appendChild(url_input);
    form_div.appendChild(tags_label);
    form_div.appendChild(tags_input);
    form_div.appendChild(category_label);
    form_div.appendChild(category_select);
    form_element.appendChild(form_div);
    form_element.appendChild(submit_button);
    editor_column.appendChild(form_element);
    row.appendChild(editor_column);
    let preview_header = document.createElement('h2');
    preview_header.innerHTML = 'Preview';
    let preview_col = document.createElement('div');
    preview_col.classList.add('col');
    preview_col.classList.add('bg-white');
    preview_col.appendChild(preview_header);
    let sample = getColumnForPost({title: '', desc: '', img_src: '', user: currentUser.username, tags: '', date: '', type: '', id: 0});
    preview_col.appendChild(sample);
    row.appendChild(preview_col);
    editor_table.appendChild(row);
    document.getElementById('page').appendChild(editor_table);
    submit_button.addEventListener('click', () => {
        if (title_input.value.length === 0 || desc_input.value.length === 0) {
            alert('Make sure to at least include a title and description');
            return;
        }
        Database.createPost(currentUser.username, session_id, title_input.value, desc_input.value, tags_input.value, url_input.value, category_select.options[category_select.selectedIndex].value);
        cur_section = 'profile';
        toggleSearchBar();
        deactivateNavs();
        profile(currentUser.username);
    });
    let update_preview = () => {
        preview_col.innerHTML = '';
        preview_col.appendChild(preview_header);
        let d = new Date, dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
        preview_col.appendChild(getColumnForPost({title: title_input.value, postdescription: desc_input.value, imgurl: url_input.value, userid: currentUser.username, tags: tags_input.value, creationdate: dformat, posttype: category_select.options[category_select.selectedIndex].value, postid: 0}));
    };
    [...form_element.children].forEach(e => e.addEventListener('change', update_preview));
    update_preview();
}

// runs when profile tab is clicked
async function profile(user_id) {
    console.log('viewing profile ' + user_id + ' as ' + currentUser.username);
    console.log('test print');
    let is_own = user_id === currentUser.username; // is true if you are viewing your own profile
    // this function generates the profile page into the body, which may appear different whether you are viewing your own or someone elses
    // do some kind of check to see if user_id is the one thats signed in
    // if it is, add the buttons that allow them to edit the bio
    // fetch the user information
    let data = await fetch("/users/get?userid=" + user_id);
    data.json().then(user_data => {
        user_data = user_data[0];
        console.log("got this user data from server: ");
        console.log(user_data);
        console.log(user_data.bio);
        console.log(user_data.nameofuser);
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
        header2.innerHTML = user_data.nameofuser; // name => nameofuser
        let header3 = document.createElement('h3');
        header3.classList.add('text-muted');
        header3.innerHTML = '@' + user_data.username; // good
        let biography;
        if (is_own) {
            biography = document.createElement('textarea');
            biography.addEventListener('input', async () => {
                (await fetch("users/changebio?" + new URLSearchParams({
                    bio: biography.value,
                    userid: currentUser.username
                })));
            });
            biography.style.width = '100%';
            biography.value = user_data.bio; // good
        } else {
            biography = document.createElement('p');
            biography.innerHTML = user_data.bio; // good
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
        let user_friends = user_data.friends; // good
        user_friends ??= [];
        user_friends.map(friend_id => Database.getUserByID(friend_id)).forEach(friend_data => {
            let friend_item = document.createElement('p');
            friend_item.classList.add('hoverline');
            friend_item.innerHTML = friend_data.name + ' @' + friend_data.username;
            if (is_own) {
                let unfriend_button = document.createElement('input');
                unfriend_button.type = 'button';
                unfriend_button.value = 'Remove';
                unfriend_button.addEventListener('click', () => {
                    Database.removeFriend(currentUser.username, session_id, friend_data.username);
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
        if (user_friends.length === 0) {
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
        photo.src = user_data.imgurl; // img_src => imgurl
        sub_personal_left.appendChild(header2);
        sub_personal_left.appendChild(header3);
        let bio_label = document.createElement('span');
        bio_label.innerHTML = 'Biography:';
        sub_personal_left.appendChild(bio_label);
        sub_personal_left.appendChild(biography);
        if (is_own) {
            // let submit_bio_button = document.createElement('input');
            // submit_bio_button.type = 'button';
            // submit_bio_button.value = 'Update';
            // sub_personal_left.appendChild(submit_bio_button);
            let profile_pic_text = document.createElement('span');
            profile_pic_text.innerHTML = 'Profile picture URL:';
            sub_personal_left.appendChild(profile_pic_text);
            let profile_pic_input = document.createElement('input');
            profile_pic_input.addEventListener('input', async () => {
                (await fetch("users/changeprofile?" + new URLSearchParams({
                    imgurl: profile_pic_input.value,
                    userid: currentUser.username
                })));
                console.log("attempting to change profile pic to " + profile_pic_input.value);
                photo.src = profile_pic_input.value;
                // send updated profile picture back to server
            });
            profile_pic_input.value = user_data.imgurl; // img_src => imgurl
            profile_pic_input.type = 'text';
            sub_personal_left.appendChild(profile_pic_input);
        }
        sub_personal_right.appendChild(photo);
        sub_personal_row.appendChild(sub_personal_left);
        sub_personal_row.appendChild(sub_personal_right);
        sub_personal.appendChild(sub_personal_row);
        personal_col.appendChild(sub_personal);
        if (is_own) {
            personal_col.appendChild(post_creator_head);
            personal_col.appendChild(post_creator_p);
        }
        personal_col.appendChild(friends);
        row.appendChild(personal_col);
        history_col.appendChild(history_header);
        if (user_data.posts == undefined || user_data.posts.length === 0) {
            let no_posts = document.createElement('p');
            no_posts.innerHTML = 'This user has no posts';
            history_col.appendChild(no_posts);
        } else {
            user_data.posts.forEach(post_id => {
                [].slice.call(getColumnForPost(Database.getPostByID(post_id)).children).forEach(childElem => {
                    history_col.appendChild(childElem);
                });
            });
        }
        row.appendChild(history_col);
        container.appendChild(row);
        document.getElementById('page').textContent = '';
        document.getElementById('page').appendChild(container);
    });
}

function deactivateNavs() {
    document.getElementById('nav-list').querySelectorAll('a').forEach(e => e.classList.remove('active'));
}

window.onload = async function() {
    let f = await fetch('/users');
    console.log(f.Response);
    currentUser = loadUser();
    renderLogout();
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
                    message(null);
                    break;
                case 'profile':
                    if (currentUser.isAuth) {
                        // do whatever we need for the profile
                        // go to the current signed in user (this should only even be visible if youre signed in)
                        profile(currentUser.username);
                    } else {
                        alert("Sign in to use this feature");
                    }

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

function loadUser(){
    let inStor = window.localStorage.getItem('user');
    if(inStor === null){
        let newUser = new user();
        window.localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    }else{
        let userFromStorage = JSON.parse(inStor);
        return userFromStorage;
    }
}

function removeUser(){
    window.localStorage.clear('user');
}

function renderLogout(){
    let logLI = document.getElementById('loginLI');
    let regLI = document.getElementById('registerLI');
    if(currentUser.isAuth === true){//if  logged in 
        //checks if the buttons do exists and remove them
        if(document.getElementById('loginButton') != undefined &&
             document.getElementById('registerButton') != undefined){

            let logBut = document.getElementById('loginButton');
            let regBut = document.getElementById('registerButton');
            logLI.removeChild(logBut);
            regLI.removeChild(regBut);
            //<a class="nav-link" id="loginButton" href="/login">Login</a>
            const logoutButton = document.createElement('a');
            logoutButton.classList.add("nav-link");
            logoutButton.setAttribute("id", "logoutButton");
            logoutButton.setAttribute("href", "/logout");
            logoutButton.innerHTML = 'Logout';

            logoutButton.addEventListener("click", function () {
                alert("Logged out  of " + currentUser.username);
                removeUser();
                currentUser = loadUser();
                renderLogout();
            });
            logLI.appendChild(logoutButton);
            //if they dont exist, dont remove them
        }else{
            const logoutButton = document.createElement('a');
            logoutButton.classList.add("nav-link");
            logoutButton.setAttribute("id", "logoutButton");
            logoutButton.setAttribute("href", "/logout");
            logoutButton.innerHTML = 'Logout';

            logoutButton.addEventListener("click", function () {
                alert("Logged out  of " + currentUser.username);
                removeUser();
                currentUser = loadUser();
                renderLogout();
            });
            logLI.appendChild(logoutButton);
        }
        //if not logged in
    }else{
        //if the logout button does exist
        if(document.getElementById('logoutButton')!= undefined){
            let logOutBut = document.getElementById('logoutButton');
            logLI.removeChild(logOutBut);

            const loginButton = document.createElement('a');
            loginButton.classList.add("nav-link");
            loginButton.setAttribute("id", "loginButton");
            loginButton.setAttribute("href", "/login");
            loginButton.innerHTML = 'Login';

            const registerButton = document.createElement('a');
            registerButton.classList.add("nav-link");
            registerButton.setAttribute("id", "registerButton");
            registerButton.setAttribute("href", "/register");
            registerButton.innerHTML = 'Register';
            logLI.appendChild(loginButton);
            regLI.appendChild(registerButton);
            //if the button doesnt exist
        }else{
            const loginButton = document.createElement('a');
            loginButton.classList.add("nav-link");
            loginButton.setAttribute("id", "loginButton");
            loginButton.setAttribute("href", "/login");
            loginButton.innerHTML = 'Login';

            const registerButton = document.createElement('a');
            registerButton.classList.add("nav-link");
            registerButton.setAttribute("id", "registerButton");
            registerButton.setAttribute("href", "/register");
            registerButton.innerHTML = 'Register';
            logLI.appendChild(loginButton);
            regLI.appendChild(registerButton);
        }
        }
    }
    
/*
    if(currentUser.isAuth === true){
        let logBut = document.getElementById('loginButton');
        let regBut = document.getElementById('registerButton');
        logLI.removeChild(logBut);
        regLI.removeChild(regBut);
        //<a class="nav-link" id="loginButton" href="/login">Login</a>
        const logoutButton = document.createElement('a');
        logoutButton.classList.add("nav-link");
        logoutButton.setAttribute("id", "logoutButton");
        logoutButton.setAttribute("href", "/logout");
        logoutButton.innerHTML = 'Logout';

        logoutButton.addEventListener("click", function () {
            alert("Logged out  of " + currentUser.username);
            removeUser();
            currentUser = loadUser();
            renderLogout();
        });
        logLI.appendChild(logoutButton);
    }else{
        let logOutBut = document.getElementById('logoutButton');
        logLI.removeChild(logOutBut);

        const loginButton = document.createElement('a');
        loginButton.classList.add("nav-link");
        loginButton.setAttribute("id", "loginButton");
        loginButton.setAttribute("href", "/login");
        loginButton.innerHTML = 'Login';

        const registerButton = document.createElement('a');
        registerButton.classList.add("nav-link");
        registerButton.setAttribute("id", "registerButton");
        registerButton.setAttribute("href", "/register");
        registerButton.innerHTML = 'Register';
        logLI.appendChild(loginButton);
        regLI.appendChild(registerButton);
    }
    */
    


//for login/register
