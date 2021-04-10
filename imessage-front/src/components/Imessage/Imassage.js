import React from 'react'
import Chat from './Chat/Chat'
import './Imassage.css'
import Sidebar from './Sidebar/Sidebar'
const Imassage = () => {
    return (
        <div className="imessage">
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Imassage;
