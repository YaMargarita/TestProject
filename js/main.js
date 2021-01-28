class Message {
    constructor() {
        this.user_id = 'user1';
        this.img_path = 'icons/user.png'
    }

    // данный метод отрисовывает сообщения (вызывается при обновлении страницы, либо при переключении между диалогами)
    displayMessage(){
        document.querySelector('#' + messageUtil.user_id).classList.add('active_user');
        let message_area = document.querySelector('.message-area');

        // в messageList записываются сохраненные сообщения из localStorage
        let messageList = localStorageMessage.getMessages(messageUtil.user_id);

        let message = '';
        let str = '';
        messageList.forEach(function (item){
            str = `<div class="message-text">${item}</div>
                <img src="${messageUtil.img_path}" alt="" class="user-icon">`;
            message += `<div class='message'>${str}</div>`
        });

        message_area.innerHTML = message;
        if(messageList.length === 0){
            message_area.innerHTML = '';
        }
    }

    // Этот метод добавляет новые сообщения, которые ввел пользователь
    addMessage(text){
        let message_area = document.querySelector('.message-area');
        let message = document.createElement('div');
        message.classList.add('message');
        message.classList.add('message_right');

        let message_text = document.createElement('div');
        message_text.classList.add('message-text');
        message_text.classList.add('message-text_right');
        message_text.textContent = text;

        let img = document.createElement('img');
        img.classList.add('user-icon');
        img.classList.add('user-icon_right');
        img.src = messageUtil.img_path;

        message.appendChild(message_text);
        message.appendChild(img);

        message_area.appendChild(message);
    }
}


let messageUtil = new Message();
messageUtil.displayMessage();


// this.user_id меняется в зависимости от выбранного пользователя
let users = document.querySelectorAll('.user-list');
users.forEach(function (item){
    item.addEventListener('click', function (e){
        reset();
        this.classList.add('active_user');
        messageUtil.user_id = item.id;
        messageUtil.displayMessage();
    })
})

// функция сбрасывает стиль для всех user
function reset(){
    users.forEach(function (item){
        item.classList.remove('active_user');
    })
}


// получение текста сообщения и обработчик событий для кнопки 'отправить'
let input_text = document.querySelector('.input-message');
let btn_send =  document.querySelector('.send-message');

btn_send.addEventListener('click', function (e){
    e.preventDefault();
    let text = input_text.value;
    if(text.trim() !== ''){
        messageUtil.addMessage(text);
        //записываю сообещние в localStorage
        localStorageMessage.putMessage(messageUtil.user_id, text);
    }
    input_text.value = '';
})