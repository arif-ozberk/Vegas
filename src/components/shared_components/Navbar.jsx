import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/Navbar.module.scss";

// Components
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignUpButton from './SignUpButton';

// Images
import logoImage from "../../images/vegas-logo-img.png";

// Context
import { mainContext } from '../../context/mainContext';


const Navbar = () => {

    const { userBalance } = useContext(mainContext);

    const { isAuthenticated, user } = useAuth0();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);


    const handleDropdownButton = () => {
        setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    }


    const handleSideBarButton = () => {
        setIsSideBarOpen(isSideBarOpen => !isSideBarOpen);
    }


    return (
        <div>
            <div className={styles.navbar}>
                <section className={styles.topBar}>
                    <div className={styles.topBarLogo}>
                        <div className={styles.hamburgerButton} onClick={handleSideBarButton}>
                            <div className={styles.hamburgerStick} style={{ backgroundColor: isSideBarOpen ? "#00FF86" : "" }}></div>
                            <div className={styles.hamburgerStick} style={{ backgroundColor: isSideBarOpen ? "#00FF86" : "" }}></div>
                            <div className={styles.hamburgerStick} style={{ backgroundColor: isSideBarOpen ? "#00FF86" : "" }}></div>
                        </div>
                        <img src={logoImage} alt="vegas-logo-image" />
                        <Link to="/" >Vegas</Link>
                    </div>

                    {isAuthenticated && <div className={styles.balanceWrapper}>
                        <div className={styles.balanceContainer}>
                            <p>${Number(userBalance).toFixed(2)} <i className='fas fa-circle-dollar-to-slot'></i></p>
                            <Link to="/balance-page" className={styles.balanceButton}>
                                <i className='fas fa-wallet'></i>
                                <h2>Balance</h2>
                            </Link>
                        </div>
                    </div>}
                    
                    <div className={styles.topBarButtons}>
                        <LoginButton />
                        <SignUpButton />

                        {isAuthenticated && <div className={styles.welcomeMessage}>
                            <img src={user.picture} alt="logged-user-image" />
                            <i 
                                className='fas fa-chevron-down' 
                                onClick={handleDropdownButton} 
                                style={{ transform: isDropdownOpen ? "rotateX(180deg)" : "rotateX(0deg)", color: isDropdownOpen ? "#00FF86" : "#ffffff" }}
                            ></i>
                            <div className={styles.userDropdown} style={{ display: isDropdownOpen ? "flex" : "none" }}>
                                <Link  onClick={() => setIsDropdownOpen(false)}><i className='fas fa-user'></i>Profile</Link>
                                <Link  onClick={() => setIsDropdownOpen(false)}><i className='fas fa-gear'></i>Settings</Link>
                                <LogoutButton setIsDropdownOpen={setIsDropdownOpen} />
                            </div>
                        </div>}
                    </div>
                </section>

                <section className={`${styles.sideBar} ${isSideBarOpen ? styles.sideBarActive : ""}`}>
                    <ul className={styles.gamesLinks}>
                        <h2>All Games</h2>
                        <li><i className='fas fa-check-to-slot'></i><Link to="/slot-page">Slot</Link></li>
                        <li><i className='fas fa-compact-disc'></i><Link to="/roulette-page">Roulette</Link></li>
                        <li><i className='fas fa-circle-half-stroke'></i><Link>Coin Flip</Link></li>
                        <li><i className='fas fa-diamond'></i><Link>Blackjack</Link></li>
                        <li><i className='fas fa-chart-line'></i><Link>Crash</Link></li>
                        <li><i className='fas fa-dice'></i><Link>Dice</Link></li>
                        <li><i className='fas fa-right-left' style={{ transform: "rotate(90deg)" }}></i><Link>High-Low</Link></li>
                        <li><i className='fas fa-land-mine-on' ></i><Link>Minefield</Link></li>
                    </ul>
                </section>
            </div>
            
            <Outlet />
        </div>
    );
}
 
export default Navbar;