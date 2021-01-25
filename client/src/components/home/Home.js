import React, { useState, useContext, useEffect } from 'react'
import "./Home.css";
import { UserContext } from "../../UserContext";
import { useHistory, Link, Redirect } from "react-router-dom";
import serverURL from '../../constant'
const axios = require('axios');

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [room_id, setRoom_id] = useState('');
    const [error, setError] = useState('')

    //Sample User
    const Vasu = {
        name: "vasu",
        id: "69"
    }

    //Set User just for example
    useEffect(() => {
        setUser(Vasu);
    }, [])

    const joinRoom = async (e) => {
        e.preventDefault();

        const options = {
            url: `http://${serverURL}/join_room`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                room_id
            }
        };

        axios(options)
            .then(res => {
                console.log(res);
                if (res.data.err){
                    setError(res.data.err);
                }else if (res.data.doc){
                    browserHistory.push('/play/' + room_id)
                    console.log('bye');
                }
            });

    }
    //Programitically navigate Using React-Router-Dom
    const browserHistory = useHistory();

    //Function to call server and get new Room id 
    const genereateUniqueID = () => {
        axios.get(`http://${serverURL}/create_room`).then(res => {
            browserHistory.push('/play/' + res.data)
        })
    }

    return (
        <div className="home-container">
            Hello World {user ? user.name : ''} 😀
            <div className="error" style={{display: !error?'none':'flex'}} >{error}</div>
            <form onSubmit={joinRoom} id="room-form">
                <input
                    type="text"
                    value={room_id}
                    onChange={e => { setError(''); setRoom_id(e.target.value) }}
                    id="join Room"
                    placeholder='Enter Room ID' />
                <button>Join Room</button>
            </form>            
            <div>OR</div>
            <button onClick={genereateUniqueID}>Create Room</button>
        </div>
    )
}

export default Home
