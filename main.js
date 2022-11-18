let cur_section = 'events'; // we open the events section by default, this variable keeps track of which section we have open

// if search button is pressed and the search text is blank, just return everything from that section, sorted by date
function search(keywords) {
    // obtain stuff from database (based on cur_section and search text)
    // programatically create the html that displays the post (the response from the database)
    // render the elements into the page
}

// runs when message tab is clicked
function messages() {
    
}

// runs when profile tab is clicked
function profile() {

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
            // now depending on which tab we switched to, we might have to hide/show the search form
            let search_form = document.getElementById('search-form');
            if (['events', 'people', 'records'].includes(cur_section)) {
                // show search form
                search_form.style.display = 'block';
            } else {
                // hide search form
                search_form.style.display = 'none';
            }
            // now we do whatever we need to based on the section we are in
            switch (cur_section) {
                case 'messages':
                    // do whatever we need for the messages
                    messages();
                    break;
                case 'profile':
                    // do whatever we need for the profile
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
};