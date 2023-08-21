import React, { useState, useEffect, useContext } from 'react';

// Styles
import styles from "../styles/page_styles/home_page_styles/HomePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import HeroBanner from '../components/home_page/HeroBanner';

// Images
import heroImage from "../images/home-hero-bg-img.jpg";
import TopGames from '../components/home_page/TopGames';

// Context
import { mainContext } from '../context/mainContext';

// Wrappers
import PageWrapper from '../wrappers/PageWrapper';


const HomePage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after 2 seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <PageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.homePageContainer} context-wrapper`} style={{ height: "300vh" }}>
                    <HeroBanner />
                    <TopGames />
                </div>
            }
        </PageWrapper>
    );
}
 
export default HomePage;