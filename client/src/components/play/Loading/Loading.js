import React, { useState } from 'react';

import './Loading.css'

const Loading = ({ room_id }) => {

    const [copySuccess, setCopySuccess] = useState('');

    // your function to copy here

    const copyToClipBoard = async e => {
        try {
            await navigator.clipboard.writeText(room_id);
            setCopySuccess('Copied!');
        } catch (err) {
            try {
                e.preventDefault();
                e.clipboardData.setData('text/plain', room_id)
                setCopySuccess('Copied!');
            } catch (error) {
                setCopySuccess('Failed to copy!');
            }
        }
    };

    return (
        <div>
            Click Below to Copy Room Id and Share it with another player to join room
            <div id='loadingroom_idcontainer'>
                <p                    
                    onClick={copyToClipBoard}
                    id='loadingroom_id'>
                    {room_id} 
                </p>
                <p>{copySuccess}</p>
            </div>
        </div>
    )
}

export default Loading
