import React, { useState, useContext, useEffect } from 'react'
import "./Home.css";
import { UserContext } from "../../UserContext";
import { useHistory , Link , Redirect } from "react-router-dom";
import serverURL from '../../constant'
const axios = require('axios');

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    
    //Sample User
    const Vasu = {
        name: "Vasu",
        id: "69"
    }

    //Set User just for example
    useEffect(() => {
        setUser(Vasu);
    }, [])

    //Programitically navigate Using React-Router-Dom
    const browserHistory = useHistory();

    //Function to call server and get new Room id 
    const genereateUniqueID = () => {
        console.log("idGenerated");
        axios.get(`http://${serverURL}/create_room`).then(res => {
            browserHistory.push('/play/'+res.data)
        })
    }

    return (
        <div className="home-container">
            Hello World {user ? user.name : ''} 😀
            <form id="room-form">
                <input id="join Room" placeholder='Enter Room ID' />
                <button>Join Room</button>
            </form>
            <div>OR</div>
            <button onClick={genereateUniqueID}>Create Room</button>
        </div>
    )
}

export default Home
