import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className={s.nav}>
            <div className={s.active}>
                <NavLink href="/profile">Profile</NavLink>
            </div>
            <div>
                <NavLink href="/news">News</NavLink>
            </div>
            <div>
                <NavLink href="/messages">Messages</NavLink>
            </div>
            <div>
                <NavLink href="/music">Music</NavLink>
            </div>
            <div>
                <NavLink href="/settings">Settings</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;