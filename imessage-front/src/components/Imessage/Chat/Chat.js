import React, { useState } from 'react'
import './Chat.css'
import { IconButton } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MicIcon from '@material-ui/icons/Mic';
import NearMeIcon from '@material-ui/icons/NearMe';
const Chat = () => {

    const [input, setInput] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(input)
        setInput('')

        //MERN magic
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>To: <span className="chat__name">Channel name</span></h4>
                <IconButton variant="filled" className="sidebar__inputButton">
                    <HelpOutlineIcon />
                </IconButton>
            </div>
            <div className="chat__message">
                <h3>test message</h3>
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
