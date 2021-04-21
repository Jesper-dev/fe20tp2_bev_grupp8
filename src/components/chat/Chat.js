import React, {useEffect, useState, useContext} from 'react';
import { ChatWrapper } from './ChatElemens'
import { FirebaseContext } from '../firebase/context';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        let msgList = []
        firebase.organization(userData.organization).child('/chat').on('value', (snapshot) => {
            const data = snapshot.val()
            for(const key in data) {
                msgList.push(data[key])
            }
            setMessages(msgList)
            console.log(msgList)
        })
    }, [])

    return (
        <ChatWrapper>
            <h1>Chat for organization</h1>
            <div className="chat-wrapper">
                {messages.map((item, index) => {
                    return <span key={index}>{item.message} - {item.name}</span>
                })}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Message:</label>
                <input />
                <button>SEND</button>
            </form>
        </ChatWrapper>
    )
}

export default Chat
