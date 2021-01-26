/*IMPORTS*/
import React, { useState, useContext , useEffect } from 'react'
import { useParams ,Redirect } from "react-router-dom";
import Chat from './chat/Chat';
import io from 'socket.io-client'
import serverURL from "../../constant";
import {UserContext} from "../../UserContext"
import Game from './tc-toe Board/Game'

let socket;
const Play = () => {

    const ENDPT = `http://${serverURL}/`
    //set global user
    const {user , setUser} = useContext(UserContext);
    //To Get Paramters from URL and display
    const { room_id } = useParams();
    
    const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)

    useEffect(() => {
        socket = io(ENDPT);
        setSocketHasBeenInitialized(true);
        //return to if user doesn not exist means someone cam here from illegal way 
        if (!user) {
            return;
        }
        //emit join user event to server with below parmas 
        socket.emit('join' , room_id );
        console.log( user.name +" "+ user.id  +" " + room_id);

    }, [ENDPT])      
    
    //No point in countinuing if user does not exist
    if (!user) {
        return <Redirect to='/login'/>;
    }
    return (socketHasBeenInitialized)?(        
        <div>
            Hello World {room_id?room_id:''}
            <Game socket={socket} room_id={room_id?room_id:''} />
            <Chat socket={socket} room_id={room_id?room_id:''} />
        </div>
    ):(
        <div>Loading...</div>
    )
}

export default Play
