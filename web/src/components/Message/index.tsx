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
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    );
};

export default Message;