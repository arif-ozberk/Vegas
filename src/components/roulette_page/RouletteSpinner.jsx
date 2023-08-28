import React, { useEffect, useRef } from 'react';

// Styles
import styles from "../../styles/page_styles/roulette_page_styles/RouletteSpinner.module.scss";

// Data
import rouletteSpinnerData from "../../data/rouletteSpinnerData.json";


const RouletteSpinner = ({ randomRouletteIndex, isRolling }) => {


    return (
        <div className={`${styles.rouletteSpinner} divider-bottom-md`}>
            <i className='fas fa-chevron-down'></i>
            <div className={styles.frame} >
                <div 
                    className={styles.rouletteElements} 
                    style={{ 
                        transform: isRolling ? `translateX(-${(randomRouletteIndex * 108) + 864 + (Math.floor(Math.random() * 45))}px)` : "translateX(0px)",
                        transition: isRolling ? "transform 6s cubic-bezier(0.215, 0.610, 0.355, 1.000)" : "" 
                    }}
                >
                    {rouletteSpinnerData.rouletteElements.map((item, index) => (
                        <div key={index} className={styles.rouletteElement} style={{ backgroundColor: item.elementColorCode }}>
                            {item.elementNumber}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
 
export default RouletteSpinner;