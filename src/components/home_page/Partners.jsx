import React from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/Partners.module.scss";

// Data
import partnersData from "../../data/partnerData.json";


const Partners = () => {


    return (
        <div className={`${styles.partners} divider-bottom-md-extended`}>
            <h1 className='title-second'>Our Partners</h1>
            <h2>Special thanks to our partners all around the globe that makes Vegas better.</h2>
            <div className={styles.partnersContainer}>
                <ul className={styles.partnersForward}>
                    {partnersData.partners.map((partner, index) => (
                        <li key={index}><i className={partner.partnerIcon}></i>{partner.partnerName}</li>
                    ))}
                </ul>

                <ul className={styles.partnersReverse}>
                    {partnersData.partners.map((partner, index) => (
                        <li key={index}><i className={partner.partnerIcon}></i>{partner.partnerName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default Partners;