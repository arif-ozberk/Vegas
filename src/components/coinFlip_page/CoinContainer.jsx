import React from 'react';

// Styles
import styles from "../../styles/page_styles/coinFlip_page_styles/CoinContainer.module.scss";


const CoinContainer = ({ isFlip, rotateDeg }) => {
    return (
        <div className={`${styles.coinContainer} divider-bottom-md`}>
            <div 
                className={styles.coin} 
                style={{ transform: isFlip ? `rotateY(${rotateDeg}deg)` : "", transition: isFlip ? "transform 4s ease" : "" }}
            >
                <div className={`${styles.frontFace} ${styles.coinFace}`}>Front</div>
                <div className={`${styles.backFace} ${styles.coinFace}`}>Back</div>
            </div>
        </div>
    );
}
 
export default CoinContainer;