import React from 'react';

// Styles
import styles from "../../styles/page_styles/coinFlip_page_styles/CoinFlipHistory.module.scss";


const CoinFlipHistory = ({ historyData }) => {
    return (
        <div className={`${styles.coinFlipHistory} divider-bottom-sm`}>
            <p><i className='fas fa-clock-rotate-left'></i>Previous Flips</p>
            <ul>
                {historyData.map((historyItem, index) => (
                    <li key={index} style={{ backgroundColor: historyItem.coinColor }}>
                        <i className={historyItem.coinSymbol}></i>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default CoinFlipHistory;