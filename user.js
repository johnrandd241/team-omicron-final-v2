export async function checkUserLogin(){
    //const data = {username, email};

    const res = await fetch("/sendLoginCred");

    const data = await res.json();

    return data;
}
