import React from 'react';

// Styles
import styles from "../../styles/shared_component_styles/LoginToPlay.module.scss";

// Components
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';

// Images
import logoImage from "../../images/vegas-logo-img.png"


const LoginToPlay = () => {
    return (
        <div className={styles.loginToPlay}>
            <h1>Login or sign up to play.</h1>
            <div className={styles.buttons}>
                <LoginButton />
                <SignUpButton />
            </div>
            <h2><img src={logoImage} alt="vegas-logo-img" />Vegas</h2>
        </div>
    );
}
 
export default LoginToPlay;