// import db from database.js;

export async function renderChat(div, chatID){
    if(typeof(chatID) === "undefined"){
        let empty = document.createElement('div');
        empty.innerHTML = "Please Select a chat from the list on the left";
        div.appendChild(empty);
        return;
    }
    let msg={};
    //Request chat data from database
    const response = await fetch("/query", 'SELECT * FROM chatTable where ID = $chatID');
    chat = response.json()["Response"];
    
    for(let msg in chat){
        let bubble = document.createElement('div');
        bubble.classList.add("d-flex mb-4");
        if(curUser/*some global for ID of whos signed in*/ === msg.user){
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

async function renderConvos(div){
    let convos = {};
    let list = document.createElement('ul');
    list.classList.add('contacts');
    const response = await fetch("/query", 'SELECT messages FROM UserTable WHERE Username = $curUser');
    convos = response.json()["Response"];
    for(let c in convos){
        let item = document.createElement('li');
        item.id = c.friend;
        //item.classList.add('')
        let card =  document.createElement('div');
        card.classList.add('d-flex bd-highlight');
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
}


export function message(div, chatID){
    let chats = document.createElement('div');
    chats.classList.add('card-body contacts_body');
    renderConvos(chats);
    let curchat = document.createElement('div');
    curchat.classList.add("card-body msg_card_body");
    renderChat(curchat, chatID);

    let card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(curchat);
    //Message entry field
    let input = document.createElement('div');
    input.classList.add('card-footer');
    let ingroup = document.createElement('div');
    ingroup.classList.add('input-group');
    let msgEntry = document.createElement('textarea');
    msgEntry.classList.add('form-control type_msg');
    msgEntry.placeholder = "Type a message";
    ingroup.appendChild(msgEntry);
    let send = document.createElement('div');
    send.classList.add('input-group-append');
    let butt = document.createElement('span');
    butt.classList.add('input-group-text send_btn');
    let innerButt = document.createElement('i');
    innerButt.classList.add('fas fa-location-arrow');
    butt.appendChild(innerButt);
    send.appendChild(butt);
    ingroup.appendChild(send);
    input.appendChild(ingroup);
    card.appendChild(input);
    //End msg entry field creation and addition to main div
    //Current Chat styling div finalization
    let RHS = document.createElement('div');
    RHS.classList.add("col-md-8 col-xl-6 chat");
    RHS.appendChild(card);
    
    //List of chats style finalization
    let LHS = document.createElement('div');
    LHS.classList.add('col-md-4 col-xl-3 chat');
    let LHS2 = document.createElement('div');
    LHS2.classList.add('card mb-sm-3 mb-md-0 contacts_card');
    LHS2.appendChild(chats);
    LHS.appendChild(LHS2);

    //Div to split screen into chats and currently opened chat
    let split = document.createElement('div');
    split.classList.add('row justify-content-center h-100');
    split.appendChild(LHS);
    split.appendChild(RHS);
    div.classList.add('constiner-fluid h-100');
    div.appendChild(split);
}