import React from 'react'
import Msg from './Msg'
import ScrollableFeed from 'react-scrollable-feed'

const Message = ({ Messages, user }) => {
    return (
        <div id='message-container' >
            {/* using package to scroll to the bottom as soon as new message arrrive */}
            <ScrollableFeed forceScroll={true} >
                {Messages.map((message, i) => {
                    return <Msg key={i} message={message} user={user} />
                })}
            </ScrollableFeed>
        </div>
    )
}

export default Message
