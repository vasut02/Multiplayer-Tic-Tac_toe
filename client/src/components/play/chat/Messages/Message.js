import React from 'react'
import Msg from './Msg'
import ScrollableFeed from 'react-scrollable-feed'

const Message = ({ Messages, user }) => {
    return (
        <div id='message-container' >
            <ScrollableFeed forceScroll={true} >
                {Messages.map((message, i) => {
                    return <Msg key={i} message={message} user={user} />
                })}
            </ScrollableFeed>
        </div>
    )
}

export default Message
