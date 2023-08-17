import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/AuthButtons.module.scss";


const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return (
        !isAuthenticated && (
            <button className={styles.loginButton} onClick={() => loginWithRedirect()}>
                Login
            </button>
        )
    )
}
 
export default LoginButton;