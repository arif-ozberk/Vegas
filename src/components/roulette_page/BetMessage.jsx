import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/page_styles/roulette_page_styles/RouletteButtons.module.scss";


const BetMessage = ({ currentBetAmount }) => {

    const { user } = useAuth0();


    return (
        <div className={styles.betMessage}>
            <p><img src={user.picture} alt="user-image" /> {user.nickname}</p>
            <p>${currentBetAmount}</p>
        </div>
    );
}
 
export default BetMessage;