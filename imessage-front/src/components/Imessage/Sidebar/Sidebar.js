import React from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat/SiebarChat'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { IconButton } from '@material-ui/core';
const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar className="sidebar__avatar" />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input placeholder="Search" />
                </div>
                <IconButton variant="filled" className="sidebar__inputButton">
                    <RateReviewIcon />
                </IconButton>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />

            </div>
        </div>
    )
}

export default Sidebar;
