import React from 'react';

// Styles
import styles from "../../styles/page_styles/coinFlip_page_styles/CoinFlipButtons.module.scss";


const CoinFlipButtons = ({ handleCoinFlip, selectedFace, ghostButtonRef, skullButtonRef }) => {


    return (
        <div className={`${styles.coinFlipButtons} divider-bottom-md-extended`}>
            <button 
                onClick={() => handleCoinFlip("ghost")} 
                style={{ 
                    backgroundColor: selectedFace === "ghost" ? "#00FF86" : "" ,
                    color: selectedFace === "ghost" ? "#0A1119": ""
                }}
                ref={ghostButtonRef}
            >
                <i className='fas fa-ghost'></i>
            </button>

            <button 
                onClick={() => handleCoinFlip("skull")}
                style={{
                    backgroundColor: selectedFace === "skull" ? "#00FF86" : "",
                    color: selectedFace === "skull" ? "#0A1119" : ""
                }}
                ref={skullButtonRef}
            >
                <i className='fas fa-skull'></i>
            </button>
        </div>
    );
}
 
export default CoinFlipButtons;