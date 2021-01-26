import React from 'react'
import Msg from './Msg'

const Message = ({Messages }) => {
    return (
        <div>
            {Messages.map((message , i ) => {                
                return <Msg key={i} message={message}/>
            })}
        </div>
    )
}

export default Message
