import React, { KeyboardEvent, Dispatch, SetStateAction } from 'react';
import './styles.css';

interface Message {
    message: string
    setMessage: (e: string) => void
    sendMessage: (e: KeyboardEvent<HTMLInputElement>) => void
}


const Input: React.FC<Message> = ({ message, sendMessage, setMessage }: Message) => {
    return (
        <form className="form">
            <input 
                className="input"
                type="text"
                placeholder="Type a message...."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}
            />
            <button type="submit" className="sendButton">Send</button>
        </form>
    );
};

export default Input;