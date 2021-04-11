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
const Sidebar = () => {

    const user = useSelector(selectUser);

    const [chat, setChat] = useState([]);

    useEffect(() => {
        axios.get('/get/chats').then((response) => {
            console.log(response.data)
            setChat(response.data)
        })
    }, [])

    const logout = () => {
        auth.signOut()
    }

    const addChat = () => {
        const promptName = prompt('Chat name')
        if (promptName) {
            axios.post('/new/chat', {
                chatname: promptName,
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
                        name={item.name}
                    />
                ))}

            </div>
        </div>
    )
}

export default Sidebar;
