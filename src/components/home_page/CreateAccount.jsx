import React from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/CreateAccount.module.scss";

// Components
import LoginButton from "../shared_components/LoginButton";
import SignUpButton from "../shared_components/SignUpButton";

// Images
import logoImage from "../../images/vegas-logo-img.png";


const CreateAccount = () => {
    return (
        <div className={`${styles.createAccount} divider-bottom-md`}>
            <div className={styles.createAccountContainer}>
                <img src={logoImage} alt="vegas-logo-image" />
                <p>DO NOT WASTE YOUR TIME</p>
                <h2>Create your<br />account today.</h2>
                <div className={styles.buttons}>
                    <SignUpButton />
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}
 
export default CreateAccount;