import React, { useState, useEffect } from 'react'
import './Chat.css'
import { IconButton } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MicIcon from '@material-ui/icons/Mic';
import NearMeIcon from '@material-ui/icons/NearMe';
import ChatMessage from './ChatMessage/ChatMessage';
import { selectChatName, selectChatId } from '../../../features/chatSlice';
import { useSelector } from 'react-redux';
import axios from '../../../axios.js'
import { selectUser } from '../../../features/counterSlice';
import Pusher from 'pusher-js';

const pusher = new Pusher('9db22ad0a7bad1f27649', {
    cluster: 'eu'
});
const Chat = () => {

    const [input, setInput] = useState('')

    const user = useSelector(selectUser)

    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)
    const [message, setMessage] = useState([])

    const getMessage = () => {

        axios.get(`/get/chat/message?id=${chatId}`).then((response) => {
            setMessage(response.data[0].conversation)
        }).catch((err) => console.log(err))

    }


    useEffect(() => {
        pusher.unsubscribe('messages')
        getMessage()

        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            getMessage()
        })

    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault()
        axios.post(`/new/message?id=${chatId}`, {
            message: input,
            timestamp: new Date().toLocaleString(),
            uid: user.uid,
            user: user.displayName,
            userImage: user.photo,

        })
        setInput('')
        const scroll = document.getElementsByClassName('chat__message');

        window.scrollTo(0, 0)


        //MERN magic
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
                <IconButton variant="filled" className="sidebar__inputButton">
                    <HelpOutlineIcon />
                </IconButton>
            </div>
            <div className="chat__message">
                {message ? (<>{message.map((item) => (
                    <ChatMessage
                        key={item.id}
                        userName={item.user}
                        userImage={item.userImage}
                        message={item.message}
                        timestamp={item.timestamp}
                    />
                ))}</>)
                    :
                    (<>Send first message</>)}

            </div>
            <div className="chat__input">
                <form onSubmit={sendMessage}>
                    <input type="text" placeholder="iMessage" onChange={(e) => setInput(e.target.value)} value={input} />
                </form>
                <IconButton onClick={sendMessage}>
                    <div className="chat__button" ><NearMeIcon /></div>
                </IconButton>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
