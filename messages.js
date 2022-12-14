
//import {getCurrentUser} from "./main.js";
export async function message(chatID){
    let div = document.getElementById('page');
    div.innerHTML = "";
    div.setAttribute("height", "100%");
    div.setAttribute("margin", "0");
    div.setAttribute("background", "#7F7FD5");
    div.setAttribute("background", "-webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)");
    div.setAttribute("background","linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)");

    let chats = document.createElement('div');
    chats.setAttribute("id","chats");
    chats.classList.add('card-body','contacts_body');
    
    let convos = {};
    let list = document.createElement('ul');
    list.classList.add('contacts');
    let user = window.localStorage.getItem('user').username;
    /* const response = await fetch(`/GetMsgFromUser?user=${user}`);
    if(!response.ok){
        console.log("API call failed. Exiting function renderConvos. Setting Div Text to Error.");
        chats.innerHTML = "Error API called failed!\nPlease try again later.";
    }else{
        //Creates list of coversations
        convos = await response.json();
        for(let c in convos){
            let item = document.createElement('li');
            item.id = c.friend;
            //item.classList.add('')
            let card =  document.createElement('div');
            card.classList.add('d-flex','bd-highlight');
            let pic = document.createElement('div');
            pic.classList.add('img_cont');
            let image = document.createElement('img');
            image.src = './stockUserPhoto.jpg';
            image.classList.add('user_img');
            pic.appendChild(image);
            card.appendChild(pic);
            let friend = document.createElement('div');
            friend.classList.add('user_info');
            let name = document.createElement('span');
            name.innerHTML = c.friend;
            friend.appendChild(name);
            card.appendChild(friend);
            item.appendChild(card);
            chats.appendChild(item);
        }
    }
 */
    let item = document.createElement('li');
    item.id = "Tester1";
    //item.classList.add('')
    let c =  document.createElement('div');
    c.classList.add('d-flex','bd-highlight');
    let pic = document.createElement('div');
    pic.classList.add('img_cont');
    let image = document.createElement('img');
    image.src = './stockUserPhoto.jpg';
    image.classList.add('user_img');
    pic.appendChild(image);
    c.appendChild(pic);
    let friend = document.createElement('div');
    friend.classList.add('user_info');
    let name = document.createElement('span');
    name.innerHTML = "Tester1";
    friend.appendChild(name);
    c.appendChild(friend);
    item.appendChild(c);
    chats.appendChild(item);




    let curchat = document.createElement('div');
    curchat.classList.add("card-body", "msg_card_body");
    curchat.setAttribute('id', 'curchat');

    //Request chat data from database
    let chat ={};
    if(chatID != undefined && chatID != null){
        //Populates the current chat
        const response2 = await fetch(`/GetMsgFromID?chatID=${chatID}`);
        if(!response2.ok){
            console.log("API call failed. Exiting function renderConvos. Setting Div Text to Error.");
            chats.innerHTML = "Error API called failed!\nPlease try again later.";
        }else{
            chat = await response2.json();
            for(let msg in chat){
                let bubble = document.createElement('div');
                bubble.classList.add("d-flex","mb-4");
                if(window.localStorage.getItem('user').username === msg.user){
                    bubble.classList.add('justify-content-start');
                }else{
                    bubble.classList.add('justify-content-end');
                }
                let uinfo = document.createElement('div');
                uinfo.innerHTML = msg.user;
                //uinfo.classList.add()
                let msgC = document.createElement('div');
                msgC.classList.add("msg_container");
                msgC.innerHTML = msg.text;
                let time = document.createElement('span');
                time.classList.add('msg_time');
                time.innerHTML = msg.date;
                msgC.appendChild(time);
                bubble.appendChild(uinfo);
                bubble.appendChild(msgC);
                curchat.appendChild(bubble);
            }
        }
    }else{
        let msg = {user:"Tester1",
                date:null,
                text:"Hello This is Tester1"};  
        msg.date= Date(); 
        let bubble = document.createElement('div');
        bubble.classList.add("d-flex","mb-4");
        bubble.classList.add('justify-content-start');
        let uinfo = document.createElement('div');
        uinfo.innerHTML = msg.user;
        //uinfo.classList.add()
        let msgC = document.createElement('div');
        msgC.classList.add("msg_container");
        msgC.innerHTML = msg.text;
        let time = document.createElement('span');
        time.classList.add('msg_time');
        //time.innerHTML = msg.date;
        msgC.appendChild(time);
        bubble.appendChild(uinfo);
        bubble.appendChild(msgC);
        curchat.appendChild(bubble);
    }

    let card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(curchat);
    //Message entry field
    let input = document.createElement('div');
    input.classList.add('card-footer');
    let ingroup = document.createElement('div');
    ingroup.classList.add('input-group');
    let msgEntry = document.createElement('textarea');
    msgEntry.classList.add('form-control', 'type_msg');
    msgEntry.placeholder = "Type a message";
    ingroup.appendChild(msgEntry);
    let send = document.createElement('div');
    send.classList.add('input-group-append');
    let butt = document.createElement('span');
    butt.classList.add('input-group-text', 'send_btn');
    butt.setAttribute('id','sendbutn');
    butt.addEventListener('click', async function(){
        let ret = {user:null,
                    date:null,
                    text:""};
        ret.date = Date();
        ret.user = window.localStorage.getItem('user').username;
        ret.text = msgEntry.value;
        let data = {currUser:null,
                chatID:null,
                chat:null
        };
        data.chat = ret;
        data.chatID = chatID;
        data.currUser = window.localStorage.getItem('user').username;
       /*  let w = await fetch(`/update/msg`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); */
        let w = {ok:true};
        if(!w.ok){
            console.log("API call failed (msg.js). Dumping Error....")
            console.log(w);
            window.alert("Failed to connect to server.");
        }else{
            /* let suc = await w.json();
            if(suc.success == false){
                console.log("Failed to push new msg to server.");
                console.log(suc);
            } */
            let bubble = document.createElement('div');
            bubble.classList.add("d-flex","mb-4");
            bubble.classList.add('justify-content-end');
            let uinfo = document.createElement('div');
            uinfo.innerHTML = "thedoggs";//window.localStorage.getItem('user').username;
            //uinfo.classList.add()
            let msgC = document.createElement('div');
            msgC.classList.add("msg_container");
            msgC.innerHTML = ret.text;
            let time = document.createElement('span');
            time.classList.add('msg_time');
            //time.innerHTML = ret.date;
            msgC.appendChild(time);
            bubble.appendChild(uinfo);
            bubble.appendChild(msgC);
            curchat.appendChild(bubble);
            msgEntry.value = null;
        }
    });
    let innerButt = document.createElement('i');
    innerButt.classList.add('fas','fa-location-arrow');
    butt.appendChild(innerButt);
    send.appendChild(butt);
    ingroup.appendChild(send);
    input.appendChild(ingroup);
    card.appendChild(input);
    //End msg entry field creation and addition to main div
    //Current Chat styling div finalization
    let RHS = document.createElement('div');
    RHS.classList.add("col-md-8","col-xl-6","chat");
    RHS.appendChild(card);
    
    //List of chats style finalization
    let LHS = document.createElement('div');
    LHS.classList.add('col-md-4', 'col-xl-3', 'chat');
    let LHS2 = document.createElement('div');
    LHS2.classList.add('card', 'mb-sm-3', 'mb-md-0','contacts_card');
    LHS2.appendChild(chats);
    LHS.appendChild(LHS2);

    //Div to split screen into chats and currently opened chat
    let split = document.createElement('div');
    split.classList.add('row','justify-content-center', 'h-100');
    split.appendChild(LHS);
    split.appendChild(RHS);
    div.classList.add('constiner-fluid','h-100');
    div.appendChild(split);
}



/* export async function renderChat(chatID){
    let div = document.getElementById('chats');
    console.log(div);
    if(typeof(chatID) === "undefined"){
        let empty = document.createElement('div');
        empty.innerHTML = "Please Select a chat from the list on the left";
        div.appendChild(empty);
        return;
    }
    let msg={};
    //Request chat data from database
    const response = await fetch("/GetMsgFromID", chatID);
    if(!response.ok){
        console.log("API call failed. Exiting function renderChat. Setting Div Text to Error.");
        div.innerHTML = "Error API called failed!\nPlease try again later.";
        return;
    }
    chat = response.json()["Response"];
    
    for(let msg in chat){
        let bubble = document.createElement('div');
        bubble.classList.add("d-flex","mb-4");
        if(logged_user === msg.user){
            bubble.classList.add('justify-content-start');
        }else{
            bubble.classList.add('justify-content-end');
        }
        let uinfo = document.createElement('div');
        uinfo.innerHTML = msg.user;
        //uinfo.classList.add()
        let msgC = document.createElement('div');
        msgC.classList.add("msg_container");
        msgC.innerHTML = msg.text;
        let time = document.createElement('span');
        time.classList.add('msg_time');
        time.innerHTML = msg.date;
        msgC.appendChild(time);
        bubble.appendChild(uinfo);
        bubble.appendChild(msgC);
    }
}

async function renderConvos(){
    let div = document.getElementById("curchat");
    let convos = {};
    let list = document.createElement('ul');
    list.classList.add('contacts');
    const response = await fetch("/GetMsgFromUser?body=$logged_user");
    if(!response.ok){
        console.log("API call failed. Exiting function renderConvos. Setting Div Text to Error.");
        div.innerHTML = "Error API called failed!\nPlease try again later.";
        return;
    }
    convos = response.json()["Response"];
    for(let c in convos){
        let item = document.createElement('li');
        item.id = c.friend;
        //item.classList.add('')
        let card =  document.createElement('div');
        card.classList.add('d-flex','bd-highlight');
        let pic = document.createElement('div');
        pic.classList.add('img_cont');
        let image = document.createElement('img');
        image.src = './stockUserPhoto.jpeg';
        pic.appendChild(image);
        card.appendChild(pic);
        let friend = document.createElement('div');
        friend.classList.add('user_info');
        let name = document.createElement('span');
        name.innerHTML = c.friend;
        friend.appendChild(name);
        card.appendChild(friend);
        item.appendChild(card);
        div.appendChild(item);
    }
} */
