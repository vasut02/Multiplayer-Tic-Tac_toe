import React, { useState, useContext } from 'react'
import { Redirect} from "react-router-dom";
import { UserContext } from "../../UserContext";
import Cookies from 'universal-cookie';

const Nickname = () => {
    //user context
    const { user, setUser } = useContext(UserContext);
    //to Take NicKname
    const [nick, setNick] = useState('')
    //Programitically navigate Using React-Router-Dom
    const cookies = new Cookies();

    //on Click Submit
    const register = (e) => {
        e.preventDefault();
        if (nick) {
            console.log(nick);
            
            //Generating unique id for each User
            var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
                'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u',
                'v', 'w', 'x', 'y', 'z' , '1', '2',
                 '3', '4', '5', '6', '7', '8', '9' , '0'];

            let result = "";
            for (let index = 0; index < 15; index++) {
                if (index === 5 || index === 10 ){
                    result += '-'
                }else
                    result += alphabet[Math.floor(Math.random() * 10000) % 35];
            }

            const newUser = {
                name:nick,
                id:result
            }

            cookies.set('user', newUser , { path: '/' });
            setUser(newUser);
        }
    }
    
    
    if (user !== null && user !== undefined ){
        console.log(cookies.get('user'));
        return <Redirect to="/"/>
    }

    return (
        <div>
            <form onSubmit={register} id="room-form">
                <input
                    type="text"
                    value={nick}
                    onChange={e => { setNick(e.target.value) }}
                    id="Nickname"
                    placeholder='Enter Your Nickname' />
                <button className="input-button">Join Room</button>
            </form>
        </div>
    )
}

export default Nickname
