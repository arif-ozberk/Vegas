import React from 'react';

// Styles
import styles from "../../styles/page_styles/balance_page_styles/BalancePage.module.scss";


const Marketplaces = () => {
    return (
        <div className={`${styles.marketplaces} divider-bottom-md`}>
            <h1 className='title-second divider-bottom-xs'>Marketplaces</h1>
            <div className={styles.marketplacesContainer}>
                <div className={styles.marketplace}>
                    <i className='fa-brands fa-google-pay'></i>
                    <p>Google Pay</p>
                </div>
                <div className={styles.marketplace}>
                    <i className='fa-brands fa-apple-pay'></i>
                    <p>Apple Pay</p>
                </div>
                <div className={styles.marketplace}>
                    <i className='fa-brands fa-amazon-pay'></i>
                    <p>Amazon Pay</p>
                </div>
            </div>
        </div>
    );
}
 
export default Marketplaces;