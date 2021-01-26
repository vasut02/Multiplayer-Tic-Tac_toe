import React from 'react'

const Msg = ({message}) => {
    return (
        <div>
            {message.name}:{message.text}
        </div>
    )
}

export default Msg
