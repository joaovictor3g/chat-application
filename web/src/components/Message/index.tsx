import React from 'react';
import './styles.css';

interface Props {
    message: {
        user: string,
        text: string
    },
    name: string
}

const Message: React.FC<Props> = ({ message: { user, text }, name }) => {
    let currentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        currentUser = true;
    }
    return (
        currentUser
        ? (
            <div className="messageContainer">
                <p className="sentText">{trimmedName}</p>
                <div className="messageBox">
                    <p className="messageText">{text}</p>
                </div>
            </div>
        )
        : (

        )
    );
};

export default Message;