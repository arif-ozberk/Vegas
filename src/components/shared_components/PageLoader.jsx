import React from 'react';

// Styles
import styles from "../../styles/shared_component_styles/PageLoader.module.scss";

// Components
import Loader from './Loader';


const PageLoader = () => {
    return (
        <div className={styles.pageLoader}>
            <Loader />
        </div>
    );
}
 
export default PageLoader;