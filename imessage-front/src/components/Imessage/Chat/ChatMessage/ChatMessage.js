import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../features/counterSlice'
import './ChatMessage.css'
const ChatMessage = ({ message, userName, userImage, timestamp }) => {

    const user = useSelector(selectUser)

    return (
        <div className={`chat__messageContent ${user.displayName === userName &&
            'message__sender'}`}>
            <Avatar className="message__photo" src={userImage} />

            <p>{userName}<br></br>{message}</p>
            <small>{timestamp}</small>
        </div>
    )
}

export default ChatMessage
