import React from 'react';

// Styles
import styles from "../../styles/page_styles/slot_page_styles/SlotPage.module.scss";


const SlotResult = ({ resultMessage, isWin }) => {
    return (
        <div className={`${styles.slotResult} divider-bottom-sm`} style={{ height: resultMessage ? "2.5rem" : "0" }}>
            {isWin && <p className={styles.winMessage} style={{ padding: resultMessage ? "1rem" : "0" }} >{resultMessage}</p>}
            {!isWin && <p className={styles.loseMessage} style={{ padding: resultMessage ? "1rem" : "0" }} >{resultMessage}</p>}
        </div>
    );
}
 
export default SlotResult;