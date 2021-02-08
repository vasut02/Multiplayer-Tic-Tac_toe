import React from 'react'
import './msg.css'

const Msg = ({ message, user }) => {
    
    if (user.id === message.user_id) {
        return (
            <div className="row right-align">
                <div className="right">
                    <p className="sentbyme">
                        {message.name}: {message.text}
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row left-align">
                <div className="left">
                    <p className="opponent">
                        {message.name}: {message.text}
                    </p>
                </div>
            </div>
        )
    }

}

export default Msg
