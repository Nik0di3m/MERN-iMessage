import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat/SiebarChat'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { IconButton } from '@material-ui/core';
import { selectUser } from '../../../features/counterSlice';
import { useSelector } from 'react-redux';
import { auth } from '../../../firebase'
import axios from '../../../axios'
import Pusher from 'pusher-js';

const pusher = new Pusher('9db22ad0a7bad1f27649', {
    cluster: 'eu'
});

const Sidebar = () => {

    const user = useSelector(selectUser);

    const [chat, setChat] = useState([]);


    const getChats = () => {
        axios.get('/get/chats').then((response) => {
            const res = response.data
            setChat(res)
        })
    }

    useEffect(() => {
        getChats()

        const channel = pusher.subscribe('chats');
        channel.bind('newChat', function (data) {
            getChats()
        })

    }, [])

    const logout = () => {
        auth.signOut()
    }

    const addChat = () => {
        const promptName = prompt('Chat name')
        const firstmessage = "Welcome!🔥🚀"
        if (promptName && firstmessage) {

            let chatId = ''

            axios.post('/new/chat', {
                chatname: promptName,
            }).then((response) => {
                chatId = response.data._id
            }).then(() => {
                axios.post(`/new/message?id=${chatId}`, {
                    message: firstmessage,
                    timestamp: new Date().toLocaleString(),
                    user: "iBot",
                    userImage: "https://botsfordiscord.com/img/error/1.png"
                })
            })
        }
    }

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar className="sidebar__avatar" src={user.photo} onClick={logout} />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input placeholder="Search" />
                </div>
                <IconButton variant="filled" className="sidebar__inputButton" onClick={addChat}>
                    <RateReviewIcon />
                </IconButton>
            </div>

            <div className="sidebar__chats">
                {chat.map((item, index) => (
                    <SidebarChat
                        key={item.id}
                        id={item.id}
                        name={item.name}
                    />
                ))}

            </div>
        </div>
    )
}

export default Sidebar;
