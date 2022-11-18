import db from database.js;
export function renderChat(div, chatID){
    //Request chat data from database
    const getChat = new PQ({text:'SELECT * FROM chatTable where ID = $chatID'});
    db.one(getChat)
        .then(chat => {/*found*/})
        .catch(error =>{//handle errors
        });
    
    for(let msg in chat){
        let bubble = document.createElement('div');
        bubble.classList.add("d-flex justify-content-start mb-4");
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

/*<div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
            I am looking for your next templates
            <span class="msg_time">9:07 AM, Today</span>
        </div>
    </div>*/