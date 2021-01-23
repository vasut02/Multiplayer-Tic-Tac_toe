import React, { useState, useContext, useEffect } from 'react'
import "./Home.css";
import { UserContext } from "../../UserContext";
const axios = require('axios');

const Home = () => {
    const { user, setUser } = useContext(UserContext);

    //To get Room Id 
    const [id, setId] = useState('');

    //Sample User
    const Vasu = {
        name: "Vasu",
        id: "69"
    }

    //Set User just for example
    useEffect(() => {
        setUser(Vasu);
    }, [])

    //Function to call server and get new room id 
    const genereateUniqueID = () => {
        console.log("idGenerated");

        //using libaray to get 
        axios.get("http://localhost:8000/create_room").then(res => {
            console.log(res.data)
            setId(res.data.toUpperCase());
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
            <button onClick={() => genereateUniqueID()}>Create Room</button>
            <div>{id ? id : ''}</div>
        </div>
    )
}

export default Home
