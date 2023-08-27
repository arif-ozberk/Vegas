import React, { useContext } from 'react';

// Styles
import styles from "../../styles/shared_component_styles/GameOptions.module.scss";

// Context
import { mainContext } from '../../context/mainContext';


const GameInfoPopup = ({ gameType }) => {

    const { setIsInfoOn } = useContext(mainContext);


    return (
        <div className={styles.popupBackground}>
            <div className={styles.gameInfoPopup}>
                <i className={`fas fa-close ${styles.closeButton}`} onClick={() => setIsInfoOn(false)}></i>
                <h2><i className={gameType.gameIcon}></i>{gameType.gameTitle}</h2>
                <ul>
                    {gameType.sections.map((sectionItem, index) => (
                        <li key={index}>
                            <h3>{sectionItem.sectionTitle}</h3>
                            <p>{sectionItem.sectionContext}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default GameInfoPopup;