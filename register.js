
document.getElementById('registerButton').addEventListener('click', (e) => {
    e.preventDefault()
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log('head')
    const data = {fullName, email, username, password};
    //sends data to server
    const handleFormData = async () => {
        console.log('asuync')

        const sent = await fetch('/register/auth', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })
 
         try {
            console.log('try')

            const result = await sent.json();
            DO().then(function(result){
                console.log('do')

                if(result.isAuth){
                    let theUser = JSON.parse(window.localStorage.getItem('user'));
                    theUser.username = result.username;
                    theUser.password = result.password;
                    theUser.email = result.email;
                    theUser.fullName = result.fullName;
                    theUser.isAuth = result.isAuth;
                    theUser.bio = result.bio;
                    theUser.friends = result.friends;
                    theUser.imgurl = result.imgurl;
        
                    window.localStorage.setItem('user', JSON.stringify(theUser));
                    window.alert("Registered as " + result.username);
                    window.location.replace("/events");
                }
                else{
                    window.alert("Invalid username/password");
                    window.location.replace("/register");
                }
            });
         } catch (error) {
             console.log(error);
         }
     };

     handleFormData();
     //takes promise from above and gets data from server
     //to check if user is validated

});
async function DO(){
    const res = await fetch("/sendAllCred");

    const data = await res.json();

    return data;
}
