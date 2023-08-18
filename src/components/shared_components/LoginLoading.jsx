import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/LoginLoading.module.scss";


const LoginLoading = () => {

    const { isLoading, isAuthenticated } = useAuth0();


    return (
        <div className={styles.loadingContainer} style={{ transform: isLoading ? "translateY(0)" : "translateY(-100%)" }}>
            <h1>Loading</h1>
        </div>
    );
}
 
export default LoginLoading;