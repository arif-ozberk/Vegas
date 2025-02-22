import React from 'react';

// Styles
import styles from "../../styles/shared_component_styles/Footer.module.scss";

// Images
import logoImage from "../../images/vegas-logo-img.png";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className={`${styles.footer} context-wrapper`}>
            <div className={styles.footerTitle}>
                <Link to="/"><img src={logoImage} alt="vegas-logo-image" />Vegas</Link>
                <div className={styles.socials}>
                    <a href="https://personal-portfolio-green-one.vercel.app" target='_blank'><i className='fa-brands fa-instagram'></i></a>
                    <a href="https://personal-portfolio-green-one.vercel.app" target='_blank'><i className='fa-brands fa-twitter'></i></a>
                    <a href="https://personal-portfolio-green-one.vercel.app" target='_blank'><i className='fa-brands fa-facebook'></i></a>
                    <a href="https://github.com/arif-ozberk" target='_blank'><i className='fa-brands fa-github'></i></a>
                    <a href="https://www.linkedin.com/in/arif-azmak/" target='_blank'><i className='fa-brands fa-linkedin'></i></a>
                </div>
            </div>
            
            <div className={styles.footerLinks}>
                <ul>
                    <h3>Info</h3>
                    <li><Link>About Us</Link></li>
                    <li><Link>Subscriptions</Link></li>
                    <li><Link>Policies</Link></li>
                    <li><Link>Partnership</Link></li>
                    <li><Link>Careers</Link></li>
                </ul>
                <ul>
                    <h3>Games</h3>
                    <li><Link to="/slot-page">Slot</Link></li>
                    <li><Link to="/roulette-page">Roulette</Link></li>
                    <li><Link to="/coin-flip-page">Coin Flip</Link></li>
                    <li><Link to="/blackjack-page">Blackjack</Link></li>
                    <li><Link to="/crash-page">Crash</Link></li>
                    <li><Link to="/dice-page">Dice</Link></li>
                    <li><Link to="/highlow-page">High Low</Link></li>
                    <li><Link to="/minefield-page">Minefield</Link></li>
                </ul>
                <ul>
                    <h3>Promotion</h3>
                    <li><Link>Affiliates</Link></li>
                    <li><Link>Rewards</Link></li>
                </ul>
                <ul>
                    <h3>Support</h3>
                    <li><Link>F.A.Q</Link></li>
                    <li><Link>Contact Us</Link></li>
                    <li><Link>Live Support</Link></li>
                </ul>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; Vegas 2023 | All Rights Reserved</p>
                <p>Arif Özberk Azmak</p>
            </div>
        </div>
    );
}
 
export default Footer;