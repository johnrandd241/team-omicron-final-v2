

document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault()
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

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
            const res = await sent.json();
         } catch (error) {
             console.log(error);
         }
     };

     handleFormData();
     //takes promise from above and gets data from server
     //to check if user is validated
     DO().then(function(result){
        if(result.isAuth){
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
    const res = await fetch("/sendLoginCred");

    const data = await res.json();

    return data;
}
