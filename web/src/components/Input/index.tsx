import React, { KeyboardEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';
import './styles.css';

interface Message {
    text: string,
    user: string,
    setMessage: (e: string) => void
    sendMessage: (e: KeyboardEvent<HTMLInputElement>) => void
}


const Input: React.FC<Message> = ({ text, user , sendMessage, setMessage }) => {
    
    return (
        <form className="form">
            <input 
                className="input"
                type="text"
                placeholder="Type a message...."
                value={text && user}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}
            />
            <button type="submit" className="sendButton">Send</button>
        </form>
    );
};

export default Input;