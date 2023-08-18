import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/AuthButtons.module.scss";


const SignUpButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();


    return (
        !isAuthenticated && (
            <button className={`${styles.signUpButton} ${styles.authButton}`} onClick={() => loginWithRedirect()}>
                Sign Up
            </button>
        )
    )
}

export default SignUpButton;