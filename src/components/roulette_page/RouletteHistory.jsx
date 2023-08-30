import React, { useState } from 'react';

// Styles
import styles from "../../styles/page_styles/roulette_page_styles/RouletteHistory.module.scss";


const RouletteHistory = ({ historyData }) => {
    

    return (
        <div className={`${styles.rouletteHistory} divider-bottom-sm`}>
            <p><i className='fas fa-clock-rotate-left'></i>Previous Rolls</p>
            <ul>
                {historyData.map((historyItem, index) => (
                    <li key={index} style={{ backgroundColor: historyItem.elementColor }}>{historyItem.elementNumber}</li>
                ))}
            </ul>
        </div>
    );
}
 
export default RouletteHistory;