import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/HeroBanner.module.scss";


const HeroBanner = () => {

    const { isAuthenticated, user } = useAuth0();

    return (
        <div className={`${styles.heroBanner} divider-bottom-xs`}>
            <div className={styles.bannerContext}>
                <h1>Your Playground of Possibilities</h1>
                <p>Welcome to a realm where your wildest gaming aspirations transform into reality through the realms of <span>Vegas</span>.</p>
            </div>
            <div className={styles.signupCard}>
                {!isAuthenticated && <h1>Sign up in <span>Seconds</span></h1>}
                {isAuthenticated && <h1>Welcome Back</h1>}
                {!isAuthenticated && <Link>Create Account</Link>}
                {isAuthenticated && <a style={{ fontSize: "1.2rem" }}><i style={{ marginRight: "0.5rem" }} className='fas fa-user'></i>{user.nickname}</a>}
            </div>
        </div>
    );
}
 
export default HeroBanner;