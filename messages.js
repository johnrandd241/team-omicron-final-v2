import db from database.js;
export function renderChat(div, chatID){
    if(typeof(chatID) === "undefined"){
        let empty = document.createElement('div');
        empty.innerHTML = "Please Select a chat from the list on the left";
        div.appendChild(empty);
        return;
    }
    //Request chat data from database
    const getChat = new PQ({text:'SELECT * FROM chatTable where ID = $chatID'});
    db.one(getChat)
        .then(chat => {/*found*/})
        .catch(error =>{//handle errors
        });
    
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

function renderConvos(div){
    let list = document.createElement('ul');
    list.classList.add('contacts');
    const getConvos = new PQ('SELECT messages FROM UserTable WHERE Username = $curUser');
    db.any(getConvos)
        .then(convos => {/*found*/})
        .catch(error =>{//handle errors
        });
    for(let c in convos){
        let item = document.createElement('li');
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


    div.appendChild(chats);
    div.appendChild(curChat);
}