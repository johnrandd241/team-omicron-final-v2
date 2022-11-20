let cur_section = 'events'; // we open the events section by default, this variable keeps track of which section we have open
const POSTS_PER_ROW = 2;
const DUMMY_POST = {title: 'This is the title of the post', img_src: 'www.com', desc: 'This is the description of the post', user: 'ch4rl3sd4rw1n', date: '10/5/22', id: 129839753759869};
const DUMMY_USER = {username: 'ch4rl3sd4rw1n', name: 'Charles Darwin', img_src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Charles_Darwin_seated_crop.jpg', bio: 'this is my biography, i have no family no friends no money no home no gall bladder and im starving and my dog died', posts: [123, 456, 789, 1234], friends: ['lemonman1', 'eggace4848', 'Hyn7eff']}

// given the unique id for a user, get the user object from the database
// id is the username
function getUserFromID(user_id) {
    return DUMMY_USER;
}

function getPostById(post_id) {
    return DUMMY_POST;
}

function getColumnForPost(post_data) {
    let cur_col = document.createElement('div');
    cur_col.classList.add('col');
    cur_col.classList.add('p-' + POSTS_PER_ROW);
    cur_col.classList.add('bg-white');
    let title_element = document.createElement('h2');
    title_element.classList.add('post-title-header');
    title_element.addEventListener('click', () => {
        cur_section = 'postview';
        toggleSearchBar();
        viewPost(post_data.id);
        alert('looking at post ' + post_data.id);
    });
    title_element.innerHTML = post_data.title;
    let img_element = document.createElement('img');
    img_element.src = post_data.img_src;
    let desc_element = document.createElement('p');
    desc_element.innerHTML = post_data.desc.substring(0, 100);
    let meta_element = document.createElement('p');
    meta_element.innerHTML = 'Posted by ' + getUserFromID(post_data.user).name + ' on ' + post_data.date;
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
    let arr = [DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST, DUMMY_POST]; 
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
function messages() {
    document.getElementById('page').innerHTML = 'to be implemented by connor';
}

// runs when profile tab is clicked
function profile(user_id) {
    // this function generates the profile page into the body, which may appear different whether you are viewing your own or someone elses
    // do some kind of check to see if user_id is the one thats signed in
    // if it is, add the buttons that allow them to edit the bio
    // fetch the user information
    let user_data = getUserFromID(user_id);
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
    let biography = document.createElement('p');
    biography.innerHTML = user_data.bio;
    let sub_personal_right = document.createElement('div');
    sub_personal_right.classList.add('col');
    sub_personal_right.classList.add('p-2');
    let photo = document.createElement('img');
    photo.classList.add('img-responsive');
    photo.classList.add('profile-pic');
    let history_col = document.createElement('div');
    history_col.classList.add('col');
    history_col.classList.add('p-2');
    history_col.classList.add('bg-white');
    let history_header = document.createElement('h2');
    history_header.innerHTML = 'Post History';
    photo.src = user_data.img_src;
    sub_personal_left.appendChild(header2);
    sub_personal_left.appendChild(header3);
    sub_personal_left.appendChild(biography);
    sub_personal_right.appendChild(photo);
    sub_personal_row.appendChild(sub_personal_left);
    sub_personal_row.appendChild(sub_personal_right);
    sub_personal.appendChild(sub_personal_row);
    personal_col.appendChild(sub_personal);
    row.appendChild(personal_col);
    history_col.appendChild(history_header);
    user_data.posts.forEach(post_id => {
        history_col.appendChild(getColumnForPost(getPostById(post_id)));
    });
    row.appendChild(history_col);
    container.appendChild(row);
    document.getElementById('page').textContent = '';
    document.getElementById('page').appendChild(container);
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
            document.getElementById('nav-list').querySelectorAll('a').forEach(e => e.classList.remove('active'));
            // set the clicked link to active
            link_elem.classList.add('active');
            // update the current section
            cur_section = link_elem.id.split('-')[0];
            toggleSearchBar();
            // now we do whatever we need to based on the section we are in
            switch (cur_section) {
                case 'messages':
                    // do whatever we need for the messages
                    messages();
                    break;
                case 'profile':
                    // do whatever we need for the profile
                    // go to the current signed in user (this should only even be visible if youre signed in)
                    profile();
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
    // search('');
};