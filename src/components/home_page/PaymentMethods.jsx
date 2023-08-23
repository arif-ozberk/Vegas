import React from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/PaymentMethods.module.scss";


const PaymentMethods = () => {
    return (
        <div className={`${styles.paymentMethods} divider-bottom-md-extended`}>
            <h1 className='title-second divider-bottom-xs'>Payment Methods</h1>
            <div className={`${styles.paymentMethodsContainer}`}>
                <div className={`${styles.crypto} ${styles.methodCard}`}>
                    <h2>Crypto Currencies</h2>
                    <ul>
                        <li><i className='fa-brands fa-btc'></i></li>
                        <li><i className='fa-brands fa-ethereum'></i></li>
                        <li><i className='fas fa-litecoin-sign'></i></li>
                        <li><i className='fa-brands fa-viacoin'></i></li>
                    </ul>
                    <p>Our platform supports a variety of popular cryptocurrencies, allowing you to make instant deposits and withdrawals. Say goodbye to traditional banking delays and hello to the future of seamless transactions.</p>
                </div>

                <div className={`${styles.bank} ${styles.methodCard}`}>
                    <h2>Bank Transfer</h2>
                    <ul>
                        <li><i className='fas fa-dollar-sign'></i></li>
                        <li><i className='fas fa-euro-sign'></i></li>
                        <li><i className='fas fa-pound-sign'></i></li>
                        <li><i className='fas fa-turkish-lira-sign'></i></li>
                    </ul>
                    <p>We offer the convenience of bank transfers in multiple major currencies. Whether you're depositing or cashing out, our secure bank transfer system ensures your funds are handled with the utmost care.</p>
                </div>

                <div className={`${styles.card} ${styles.methodCard}`}>
                    <h2>Credit Cards</h2>
                    <ul>
                        <li><i className='fa-brands fa-cc-mastercard'></i></li>
                        <li><i className='fa-brands fa-cc-visa'></i></li>
                        <li><i className='fa-brands fa-cc-stripe'></i></li>
                        <li><i className='fa-brands fa-cc-paypal'></i></li> 
                    </ul>
                    <p>With our seamless credit card payment system, you can fund your account and dive into the excitement without delay.</p>
                </div>

                <div className={`${styles.store} ${styles.methodCard}`}>
                    <h2>Online Marketplaces</h2>
                    <ul>
                        <li><i className='fa-brands fa-apple-pay'></i></li>
                        <li><i className='fa-brands fa-google-pay'></i></li>
                        <li><i className='fa-brands fa-amazon-pay'></i></li>
                        <li><i className='fa-brands fa-alipay'></i></li> 
                    </ul>
                    <p>With our integrated support for these trusted platforms, funding your account is just a tap away. Fast, secure, and familiar.</p>
                </div>
            </div>
        </div>
    );
}
 
export default PaymentMethods;