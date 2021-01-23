/*IMPORTS*/
import React ,{useState} from 'react'
import Input from './input/Input'
import io from 'socket.io-client'

let socket;
const Chat = () => {

    //to store in input FORM
    const [message, setMessage] = useState('');
    //array to store message
    const [messages, setMessages] = useState([]);

    //function that sends message to server
    const sendMessage = (e)=>{
        e.preventDefault();
        console.log(message);
        setMessage('');
    }

    return (
        <div>
            <Input 
                message= {message}
                setMessage= {setMessage}
                sendMessage= {sendMessage}
            />
        </div>
    )
}

export default Chat
