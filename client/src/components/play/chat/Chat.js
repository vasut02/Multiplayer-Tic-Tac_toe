/*IMPORTS*/
import React ,{useState , useEffect , useContext} from 'react'
import Input from './input/Input'
import io from 'socket.io-client'
import serverURL from "../../../constant";
import Message from './Messages/Message'
import {UserContext} from "../../../UserContext"

// let socket;
const Chat = ({socket ,room_id}) => {
    
    const ENDPT = `http://${serverURL}/`

    const {user , setUser} = useContext(UserContext);
    //to store in input FORM
    const [message, setMessage] = useState('');
    //array to store message
    const [messages, setMessages] = useState([]);


    // //Initialize Sokcet.io
    // useEffect(() => {
    //     socket = io(ENDPT);
    //     socket.emit('join' , room_id );
    // }, [ENDPT]) 
   
    //function that sends message to server
    const sendMessage = (e)=>{
        e.preventDefault();
        console.log(message);
        //emit messsage to sokcet server
        const msg = {
            message,
            name: user.name ,
            user_id:user.id ,
            room_id 
            };

        // console.log(msg);
        socket.emit('sendMessage' , msg );
        setMessage('')
    }

    useEffect(() => {
        socket.on('messageReceived', message => {
            // console.log('Agya Agya Maal Agya',message);
            setMessages(msgs => [ ...msgs, message ]);
          });
    }, [])

    // useEffect(() => {
	// 	socket.on('squareClickedReceived', click=>{
    //         console.log('emitted congratz',click);
	// 	})
	// })

    return (
        <div>
            <Message Messages={messages} />
            <Input 
                message= {message}
                setMessage= {setMessage}
                sendMessage= {sendMessage}
            />
        </div>
    )
}

export default Chat
