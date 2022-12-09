
export class user{
    constructor(fName, lName, email, username, password, isAuth){
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.isAuth = isAuth;
    }
}

export async function checkUserLogin(){
    const res = await fetch("/sendLoginCred");

    const data = await res.json();

    return data;
}
export async function createUser(){
    const res = await fetch("/sendAllCred");

    const data = await res.json();

    const fName = data.fName;
    const lName = data.lName;
    const email = data.email;
    const username = data.username;
    const password = data.password;

    const isAuth = data.isAuth;
    //can be used to show if user is online

    const USER = new user(fName, lName, email, username, password, isAuth);
    return USER;
}