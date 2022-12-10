
export class user{
    constructor(){
        this.fullName = null;
        this.email = null;
        this.username = null;
        this.password = null;
        this.bio = null;
        this.friends = null;
        this.imgurl = null;
        this.isAuth = false;
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