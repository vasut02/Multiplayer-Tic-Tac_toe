import React from 'react'
import logo from './logo.png';
import "./Navbar.css";

const NavBar = () => {
    return (
        <div className="NavBar">
            <img href="/" id="logo"  src={logo} alt='Logo'/> 
            <div href="/" id="tictoe">Tic-Toe</div>
        </div>
    )
}

export default NavBar
