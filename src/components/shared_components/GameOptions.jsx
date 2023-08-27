import React, { useContext } from 'react';

// Styles
import styles from "../../styles/shared_component_styles/GameOptions.module.scss";

// Context
import { mainContext } from '../../context/mainContext';


const GameOptions = () => {

    const { gameNotification, setGameNotification } = useContext(mainContext);


    const handleNotificationClick = () => {
        setGameNotification(gameNotification => !gameNotification);
    }

    
    return (
        <div className={styles.gameOptions}>
            <i className={gameNotification ? "fas fa-bell" : "fas fa-bell-slash"} onClick={handleNotificationClick}></i>
            <i className='fas fa-circle-info'></i>
        </div>
    );
}
 
export default GameOptions;