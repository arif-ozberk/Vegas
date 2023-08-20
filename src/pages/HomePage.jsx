import React, { useState, useEffect, useContext } from 'react';

// Styles
import styles from "../styles/page_styles/home_page_styles/HomePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import Loader from '../components/shared_components/Loader';


const HomePage = () => {

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes for 2 seconds
        }, 2000);
    }, []);


    return (
        <div className={`${styles.homePage} page-container navbar-divider`}>
            {isPageLoading && <PageLoader />}
            {!isPageLoading && <div className={`${styles.homePageContainer} context-wrapper`}>
                <h1 style={{ color: "white", height: "300vh" }}>Home Page</h1>
            </div>}
        </div>
    );
}
 
export default HomePage;