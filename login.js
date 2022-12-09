

document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault()
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let result = null;
    const data = {username, password};
    //sends data to server
    
    const handleFormData = async () => {

        const sent = await fetch('/login/auth', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })

         try {
             result = await sent.json();
             console.log(result);

         } catch (error) {
             console.log(error);

         }
     };
     //console.log(result);
     handleFormData();
     
     //takes promise from above and gets data from server
     //to check if user is validated
     DO().then(function(result){
        console.log(result);
        if(result.isAuth){
            let theUser = JSON.parse(window.localStorage.getItem('user'));
            theUser.username = result.username;
            theUser.password = result.password;
            theUser.email = result.email;
            theUser.fName = result.fName;
            theUser.lName = result.lName;
            theUser.isAuth = result.isAuth;

            window.localStorage.setItem('user', JSON.stringify(theUser));
            window.alert("Signed in as " + result.username);
            window.location.replace("/events");
        }
        else{
            window.alert("Invalid username/password");
            window.location.replace("/login");
        }
    });
});
async function DO(){
    const res = await fetch("/sendAllCred");

    const data = await res.json();

    return data;
}
