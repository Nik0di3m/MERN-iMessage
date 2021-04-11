import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './SidebarChat.css'
import { setChat } from '../../../../features/chatSlice.js'
import axios from '../../../../axios.js'
const SiebarChat = ({ id, name }) => {

    const dispatch = useDispatch();

    const [chats, setChats] = useState([])


    useEffect(() => {
        axios.get(`/get/chat/messageLast?id=${id}`).then((response) => {

            const sorted = response.data.sort((a, b) => b - a)

            setChats(sorted[0])
            console.log(sorted[0])
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
