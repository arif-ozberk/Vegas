import React, { useContext, useEffect, useState } from 'react';

// Styles
import styles from "../styles/page_styles/roulette_page_styles/RoulettePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';


const RoulettePage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <GamePageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.roulettePage} context-wrapper`}>
                    Roulette Page
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default RoulettePage;