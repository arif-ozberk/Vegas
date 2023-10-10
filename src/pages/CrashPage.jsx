import React, { useContext, useEffect, useState } from 'react';

// Styles
import styles from "../styles/page_styles/crash_page_styles/CrashPage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GamePageTitle from '../components/shared_components/GamePageTitle';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";


const CrashPage = () => {

    const { userBalance, setUserBalance, PAGE_LOADING_DURATION, topNotificationOptions, bottomNotificationOptions, gameNotification } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <GamePageWrapper>
            {isPageLoading ? <PageLoader /> :

                <div className={`${styles.crashPage} context-wrapper`}>
                    <GamePageTitle gameName={"Crash"} gameInfoData={gameInfoData.gameInfos.crashGame} />
                </div>
            }

        </GamePageWrapper>
    );
}
 
export default CrashPage;