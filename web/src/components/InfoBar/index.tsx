import React from 'react';
import './styles.css';

import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';

interface Room {
    room: string
}

const InfoBar = ({ room }: Room) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} />
                <h1>{room}</h1>
            </div>

            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close"/></a>
            </div>
        </div>
    );
};

export default InfoBar;
