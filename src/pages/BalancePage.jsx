import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/balance_page_styles/BalancePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import CryptoCurrencies from '../components/balance_page/CryptoCurrencies';
import BankDeposit from '../components/balance_page/BankDeposit';
import Marketplaces from '../components/balance_page/Marketplaces';
import GiftCard from '../components/balance_page/GiftCard';

// Wrappers
import PageWrapper from '../wrappers/PageWrapper';

// Context
import { mainContext } from '../context/mainContext';


const BalancePage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);

    const [selectedMethod, setSelectedMethod] = useState("deposit");


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <PageWrapper>
            {isPageLoading ? <PageLoader /> :

                <div className={`${styles.balancePage} context-wrapper`}>
                    <ToastContainer />

                    <div className={`${styles.methodSelector} divider-bottom-xs`}>
                        <p 
                            style={{ 
                                backgroundColor: selectedMethod === "deposit" ? "#00FF86" : "#273546",
                                color: selectedMethod === "deposit" ? "#0A1119" : "#ffffff"
                            }}
                            onClick={() => setSelectedMethod("deposit")}
                        >Deposit</p>
                        <p
                            style={{
                                backgroundColor: selectedMethod === "withdraw" ? "#00FF86" : "#273546",
                                color: selectedMethod === "withdraw" ? "#0A1119" : "#ffffff"
                            }}
                            onClick={() => setSelectedMethod("withdraw")}
                        >Withdraw</p>
                    </div>

                    {selectedMethod === "deposit" && 
                        <>
                            <CryptoCurrencies cryptoTitle={"Crypto Deposit"} />
                            <BankDeposit bankTitle={"Bank Deposit"} />
                            <Marketplaces />
                            <GiftCard />
                        </>   
                    }

                    {selectedMethod === "withdraw" &&
                        <>
                            <CryptoCurrencies cryptoTitle={"Crypto Withdraw"} />
                            <BankDeposit bankTitle={"Bank Withdraw"} />
                        </>
                    }
                </div>
            }
        </PageWrapper>
    );
}
 
export default BalancePage;