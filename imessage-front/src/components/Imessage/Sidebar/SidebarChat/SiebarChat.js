import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './SidebarChat.css'
import { setChat } from '../../../../features/chatSlice.js'
import axios from '../../../../axios.js'
import Pusher from 'pusher-js';

const pusher = new Pusher('9db22ad0a7bad1f27649', {
    cluster: 'eu'
});

const SiebarChat = ({ id, name }) => {

    const dispatch = useDispatch();

    const [chats, setChats] = useState([])

    const getSidebarElements = () => {

        axios.get(`/get/chat/messageLast?id=${id}`).then((response) => {
            const sorted = response.data.sort((a, b) => b - a)
            setChats(sorted[0])
            console.log(sorted[0])
        })
    }

    useEffect(() => {

        getSidebarElements()

        const channel = pusher.subscribe('messages');
        channel.bind('newMessage', function (data) {
            console.log('work')
            getSidebarElements()
        })



    }, [id])

    return (
        <div
            onClick={() =>
                dispatch(
                    setChat({
                        chatId: id,
                        chatName: name,
                    })
                )
            }
            className="sidebarChat">
            <Avatar src={chats.userImage} />
            <div className="sidebarChat__info">
                <h3>{name}</h3>
                <p>{chats.message}</p>
                <small>{chats.timestamp}</small>
            </div>
        </div>
    )
}

export default SiebarChat
