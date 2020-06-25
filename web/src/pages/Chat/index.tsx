import React, { useState, KeyboardEvent, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../../components/InfoBar';
import Input from '../../components/Input';
import Messages from '../../components/Messages';

import './styles.css';

interface Location {
    location: {
        search: string
    }
};
interface Messages {
    messages: {
        text: string,
        user:string
    }[];
    name: string
}

interface Message {
    user: string, 
    text: string
}

let socket: SocketIOClient.Socket;

const Chat: React.FC<Location> = ({ location }) => {
    const [name, setName] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [message, setMessage] = useState<Message>();
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

            //socket.off('join');
        }
       
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages(messages => [...messages, message])
        });
    }, [messages]);

    const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(message));
        }

        console.log(message, messages)
    }

    return(
        <div className="outerContainer"> 
            <div className="container">
                <InfoBar room={room} />
                <Input 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage}
                />
                <Messages messages={messages} name={name}/>

            </div>
        </div>
    );
};

export default Chat;