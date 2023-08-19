import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/LoginLoading.module.scss";

// Components
import Loader from './Loader';

// Images
import logoImage from "../../images/vegas-logo-img.png";


const LoginLoading = () => {

    const { isLoading, isAuthenticated } = useAuth0();


    return (
        <div className={styles.loadingContainer} style={{ transform: isLoading ? "translateY(0)" : "translateY(-100%)" }}>
            <Loader />
            <div className={styles.loadingLogo}>
                <img src={logoImage} alt="vegas-logo-image" />
                <h1>Vegas</h1>
            </div>
        </div>
    );
}
 
export default LoginLoading;