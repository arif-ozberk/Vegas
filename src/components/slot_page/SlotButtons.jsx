import React from 'react';

// Styles
import styles from "../../styles/page_styles/slot_page_styles/SlotPage.module.scss";


const SlotButtons = ({ rollButtonRef, resetButtonRef, handleRollButton, handleResetButton, isRolling }) => {
    return (
        <div className={styles.slotButtonsFrame}>
            <div className={styles.slotButtons} style={{ transform: isRolling ? `translateY(${rollButtonRef.current.clientHeight}px)` : "translateY(0)" }}>
                <button className={styles.resetButton} ref={resetButtonRef} onClick={handleResetButton}>
                    {["R", "E", "S", "E", "T"].map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </button>

                <button className={styles.rollButton} ref={rollButtonRef} onClick={handleRollButton}>
                    {["R", "O", "L", "L"].map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </button>
            </div>
        </div>
        
    );
}
 
export default SlotButtons;