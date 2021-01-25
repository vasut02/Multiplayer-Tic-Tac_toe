/*IMPORTS*/
import React, { useContext , useEffect } from 'react'
import { useParams ,Redirect } from "react-router-dom";
import Chat from './chat/Chat';
import io from 'socket.io-client'
import serverURL from "../../constant";
import {UserContext} from "../../UserContext"

let socket;
const Play = () => {

    const ENDPT = `http://${serverURL}/`
    //set global user
    const {user , setUser} = useContext(UserContext);
    //To Get Paramters from URL and display
    const { room_id } = useParams();

    useEffect(() => {
        socket = io(ENDPT);

        //return to if user doesn not exist means someone cam here from illegal way 
        if (!user) {
            return;
        }
        //emit join user event to server with below parmas 
        socket.emit('join' , {name: user.name , user_id:user.id , room_id});
        console.log( user.name +" "+ user.id  +" " + room_id);
    }, [ENDPT])      
    
    //No point in countinuing if user does not exist
    if (!user) {
        return <Redirect to='/login'/>;
    }
    return (
        <div>
            Hello World {room_id?room_id:''}
            <Chat room_id={room_id?room_id:''} />
        </div>
    )
}

export default Play
