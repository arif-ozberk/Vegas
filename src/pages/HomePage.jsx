import React, { useState, useEffect, useContext } from 'react';

// Styles
import styles from "../styles/page_styles/home_page_styles/HomePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import HeroBanner from '../components/home_page/HeroBanner';

// Images
import heroImage from "../images/home-hero-bg-img.jpg";


const HomePage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after 2 seconds
        }, 2000);
    }, []);


    return (
        <div className={`${styles.homePage} page-container navbar-divider`}>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.homePageContainer} context-wrapper`} style={{ height: "300vh" }}>
                    <HeroBanner />
                </div>
            }
        </div>
    );
}
 
export default HomePage;