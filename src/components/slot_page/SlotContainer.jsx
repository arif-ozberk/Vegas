import React from 'react';

// Styles
import styles from "../../styles/page_styles/slot_page_styles/SlotPage.module.scss";


const SlotContainer = ({ slotRows, isRolling, slotItemRef }) => {
    return (
        <div className={styles.slotContainer}>
            {slotRows.map((slotRow, index) => (
                <div
                    className={styles.slotRow}
                    style={{
                        transition: isRolling ? "transform 1.5s ease" : "none",
                        transform: isRolling ? `translateY(-${14 * ((slotItemRef.current.clientHeight + 2) + 16)}px)` : "translateY(0)",
                        transitionDelay: isRolling ? `${index * 0.4}s` : "none",
                    }}
                    key={index}
                >
                    {slotRow.map((slotItem, index) => (
                        <div key={index} className={styles.slotItem} ref={slotItemRef}>
                            {slotItem}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
 
export default SlotContainer;