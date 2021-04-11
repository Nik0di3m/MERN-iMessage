import { Avatar } from '@material-ui/core'
import React from 'react'
import './SidebarChat.css'
const SiebarChat = ({ name }) => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h3>{name}</h3>
                <p>Last message sent ...</p>
                <small>timestamp</small>
            </div>
        </div>
    )
}

export default SiebarChat
