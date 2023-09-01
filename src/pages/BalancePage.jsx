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


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <PageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.balancePage} context-wrapper`}>
                    <ToastContainer />

                    <CryptoCurrencies />
                    <BankDeposit />
                    <Marketplaces />

                    <GiftCard />
                </div>
            }
        </PageWrapper>
    );
}
 
export default BalancePage;