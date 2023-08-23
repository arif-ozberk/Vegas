import React from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/Rewards.module.scss";


const Rewards = () => {
    return (
        <div className={`${styles.rewards} divider-bottom-md-extended`}>
            <h1 className='title-second divider-bottom-xs'>Rewards & Bonuses</h1>
            <div className={`${styles.rewardsContainer}`}>
                <div className={`${styles.rewardCard}`}>
                    <h2><i className='fas fa-crown'></i>Premium Club</h2>
                    <h3>VIP Events</h3>
                    <p style={{ marginBottom: "1.5rem" }}>Invitation to special VIP events, where you can network with fellow high rollers and experience luxurious entertainment.</p>
                    <h3>Enhanced Cashback</h3>
                    <p>Enjoy a higher cashback percentage on losses, ensuring that even when luck isn't on your side, you still get rewarded.</p>
                </div>

                <div className={`${styles.rewardCard}`}>
                    <h2><i className='fas fa-crown'></i>Loyalty Club</h2>
                    <h3>Loyalty Points</h3>
                    <p style={{ marginBottom: "1.5rem" }}>Earn loyalty points with every wager, which can be redeemed for bonus funds or even exclusive merchandise from our loyalty store.</p>
                    <h3>Weekly Reload </h3>
                    <p>Enjoy a weekly reload bonus to keep the excitement going and increase your chances of winning.</p>
                </div>
            </div>
        </div>
    );
}
 
export default Rewards;