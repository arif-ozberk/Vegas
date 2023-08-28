import React from 'react';

// Styles
import styles from "../../styles/page_styles/roulette_page_styles/RouletteResult.module.scss";


const RouletteResult = ({ resultMessage, rollingMessage }) => {
    return (
        <div className={`${styles.rouletteResult} divider-bottom-sm`}>
            {rollingMessage && <p>Rolling...</p>}
            {!rollingMessage && <div className={styles.resultElement} style={{ backgroundColor: resultMessage.elementColorCode }}>
                {resultMessage.elementNumber}
            </div>}
            
            <div className={styles.resultStick}></div>
        </div>
    );
}
 
export default RouletteResult;