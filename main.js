// add functionality to when nav links are clicked
document.getElementById('nav-list').querySelectorAll('a').forEach(link_elem => {
    link_elem.addEventListener('click', function() {
        document.getElementById('nav-list').querySelectorAll('a').forEach(e => e.classList.remove('active'));
        link_elem.classList.add('active');
        // now set body content to be the default search for this tab
    });
});

// when search button is pressed
// if search button is pressed and the search text is blank, just return everything from that section, sorted by date
document.getElementById('search-button').addEventListener('click', function() {
    let text = document.getElementById('search-text').value;
    
});