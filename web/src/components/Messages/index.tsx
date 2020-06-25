import React from 'react';
import Message from '../Message';

import './styles.css';

interface MessageProps {
    messages: string[],
    name: string
}

const Messages:React.FC<MessageProps> = ({ messages, name }) => {
    return (
        <div>
            {messages.map((message, idx: number) => (
                <div key={idx}>
                    <Message message={message} name={name}/>
                </div>
            ))}
        </div>
    );
};

export default Messages;