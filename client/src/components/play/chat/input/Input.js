import React from 'react'
import './Input.css'

const Input = ({message, setMessage , sendMessage}) => {
    return (
        <div>
            <form onSubmit={sendMessage} className="message-form">
                <input 
                    type="text" className="input-message" placeholder="Type A Message"
                    value={message} 
                    onChange={e=>{setMessage(e.target.value)}}
                />
                <button type="submit"  >Send</button>
            </form>
        </div>
    )
}

export default Input
