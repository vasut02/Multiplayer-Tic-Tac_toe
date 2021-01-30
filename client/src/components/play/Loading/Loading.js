import React from 'react'
import logo from '../../navBar/logo.png';
import './Loading.css'

const Loading = ({ room_id }) => {
    return (
        <div>
            Click Below to Copy Room Id and Share it with another player to join room
            <div id='loadingroom_idcontainer'>
                <p
                    onClick={() => navigator.clipboard.writeText(room_id)}
                    id='loadingroom_id'>
                    {room_id}
                </p>
                
            </div>
        </div>
    )
}

export default Loading
