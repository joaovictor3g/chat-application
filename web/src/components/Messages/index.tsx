import React from 'react';

import './styles.css';

interface MessageProps {
    messages: String[],
    name: string
}

const Messages:React.FC<MessageProps> = ({ messages, name }) => {
    return (
        <div>
            {messages.map((message, idx: number) => (
                <div key={idx}>
                    Message: {message}
                </div>
            ))}
        </div>
    );
};

export default Messages;