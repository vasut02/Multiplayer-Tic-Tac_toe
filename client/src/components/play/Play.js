import React from 'react'
import { useParams } from "react-router-dom";
const Play = () => {

    //To Get Paramters from URL
    const { room_id } = useParams();

    return (
        <div>
            Hello World {room_id?room_id:''}
        </div>
    )
}

export default Play
