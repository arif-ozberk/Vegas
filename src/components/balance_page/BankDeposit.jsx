import React from 'react';

// Styles
import styles from "../../styles/page_styles/balance_page_styles/BalancePage.module.scss";


const BankDeposit = () => {
    return (
        <div className={`${styles.bankDeposit} divider-bottom-md`}>
            <h1 className='title-second divider-bottom-xs'>Bank Deposit</h1>
            <div className={styles.bankCard}>
                <i className='fas fa-bank'></i>
                <p>Local Bank</p>
            </div>
        </div>
    );
}
 
export default BankDeposit;