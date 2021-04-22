import React, {useEffect, useState, useContext} from 'react';
import { ChatWrapper } from './ChatElemens'
import { FirebaseContext } from '../firebase/context';
import ChatCard from './ChatCard'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    // const [yourMsg, setYourMsg] = useState('')
    const [messageId, setMessageId] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        getUserInfo(userData.uid)

        firebase.organization(userData.organization).child('/chat').on('value', (snapshot) => {
            const data = snapshot.val()
            let msgList = []
            for(const key in data) {
                msgList.push(data[key])
            }
            setMessages(msgList)
            setMessageId(msgList.length + 1)
            console.log(msgList)
            console.log(messageId)
        })
        console.log(userInfo)
    }, [])

    const getUserInfo = (id) => {
        firebase.user(id).on('value', (snapshot) => {
            setUserInfo(snapshot.val())
        })
    }

    const onMsgSend = (e, name, pic, text, id) => {
        e.preventDefault()

        firebase.organization(userData.organization).child('/chat').update({
            [id]: {
                name,
                pic,
                text
            }
        })

        setText('')
    }

    return (
        <ChatWrapper>
            <h1>Chat for organization</h1>
            <div className="chat-wrapper">
                {messages.map((item, index) => {
                    return <ChatCard key={index} msg={item.text} pic={item.pic} yourMsg={item.name === userInfo.username ? true : false} />
                })}
            </div>
            <form onSubmit={(e) => onMsgSend(e, userInfo.username, userInfo.picture.profile_pic, text, messageId)}>
                <label>Message: </label>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
                <button>SEND</button>
            </form>
        </ChatWrapper>
    )
}

export default Chat
