class LocalStorage{

    //Данный метод возвращет все записи, которые содержатся в localStorage
    getMessages(keyName){
        //список, который сохранился в localStorage
        let list = localStorage.getItem(keyName);
        if(list !== null){
            return JSON.parse(list);
        } else {
            return [];
        }
    }

    //Данный метод записывает сообщение под своим ключом
    putMessage(id, text){
        let list = localStorageMessage.getMessages(id);
        list.push(text);
        localStorage.setItem(id, JSON.stringify(list));
    }
}

let localStorageMessage = new LocalStorage();