import React from 'react';

// Styles
import styles from "../styles/page_styles/home_page_styles/HomePage.module.scss";



const HomePage = () => {


    return (
        <div className={`${styles.homePage} page-container navbar-divider`}>
            <div className={`${styles.homePageContainer} context-wrapper`}>
                Home Page
            </div>
        </div>
    );
}
 
export default HomePage;