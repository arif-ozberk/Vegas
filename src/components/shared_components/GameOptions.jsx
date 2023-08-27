import React, { useContext, useState } from 'react';

// Styles
import styles from "../../styles/shared_component_styles/GameOptions.module.scss";

// Components
import GameInfoPopup from './GameInfoPopup';

// Context
import { mainContext } from '../../context/mainContext';


const GameOptions = ({ gameType }) => {

    const { gameNotification, setGameNotification, isInfoOn, setIsInfoOn } = useContext(mainContext);


    const handleNotificationClick = () => {
        setGameNotification(gameNotification => !gameNotification);
    }


    const handleInfoClick = () => {
        setIsInfoOn(true);
    }


    return (
        <div className={styles.gameOptions}>
            <i 
                className={`${gameNotification ? "fas fa-bell" : "fas fa-bell-slash"} ${styles.notificationButton}`} 
                onClick={handleNotificationClick}
            ></i>
            <i 
                className={`fas fa-circle-info ${styles.infoButton}`}
                onClick={handleInfoClick}
            ></i>

            {isInfoOn && <GameInfoPopup gameType={gameType} />}
            
        </div>
    );
}
 
export default GameOptions;