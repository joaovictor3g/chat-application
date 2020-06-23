import React, { useState, KeyboardEvent, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './styles.css';

interface Location {
    location: {
        search: string
    }
};

interface Error {
    error: string
}

let socket: SocketIOClient.Socket;

const Chat: React.FC<Location> = ({ location }) => {
    const [name, setName] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages]= useState<string[]>([]);
   

    const ENDPOINT = 'localhost:3333';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(String(name));
        setRoom(String(room));

        socket.emit('join', { name, room }, () => {
           
        });

        return () => {
            socket.emit('disconnect');

            socket.off('join');
        }
       
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages([...messages, message])
        });
    }, [messages]);

    const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }

        console.log(message, messages)
    }

    return(
        <div className="outerContainer"> 
            <div className="container">
                <input 
                    value={message} 
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) :  null}
                />
            </div>
        </div>
    );
};

export default Chat;