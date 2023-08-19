import React, { useState, useEffect } from 'react';
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


const Navbar = () => {

    const { isAuthenticated, user } = useAuth0();

    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        user ? setUserInfo(user) : "";
    }, [isAuthenticated]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);


    const handleDropdownButton = () => {
        setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    }


    const handleSideBarButton = () => {
        setIsSideBarOpen(true);
    }


    return (
        <div>
            <div className={styles.navbar}>
                <i className={`${styles.sideBarButton} fas fa-angles-right`} onClick={handleSideBarButton}></i>

                <section className={styles.topBar}>
                    <Link to="/" className={styles.topBarLogo}>
                        <img src={logoImage} alt="vegas-logo-image" />
                        <h1>Vegas</h1>
                    </Link>

                    {isAuthenticated && <div className={styles.balanceWrapper}>
                        <div className={styles.balanceContainer}>
                            <p>$364.99 <i className='fas fa-circle-dollar-to-slot'></i></p>
                            <Link className={styles.balanceButton}>
                                <i className='fas fa-wallet'></i>
                                <h2>Balance</h2>
                            </Link>
                        </div>
                    </div>}
                    
                    <div className={styles.topBarButtons}>
                        <LoginButton />
                        <SignUpButton />

                        {isAuthenticated && <div className={styles.welcomeMessage}>
                            <img src={userInfo.picture} alt="logged-user-image" />
                            <p>{userInfo.nickname}</p>
                            <i className='fas fa-chevron-down' onClick={handleDropdownButton}></i>
                            <div className={styles.userDropdown} style={{ display: isDropdownOpen ? "flex" : "none" }}>
                                <Link  onClick={() => setIsDropdownOpen(false)}><i className='fas fa-user'></i>Profile</Link>
                                <Link  onClick={() => setIsDropdownOpen(false)}><i className='fas fa-gear'></i>Settings</Link>
                                <LogoutButton setIsDropdownOpen={setIsDropdownOpen} />
                            </div>
                        </div>}
                    </div>
                </section>

                <section className={`${styles.sideBar} ${isSideBarOpen ? styles.sideBarActive : ""}`}>
                    <i className={`${styles.sideBarCloseButton} fas fa-close`} onClick={() => setIsSideBarOpen(false)}></i>
                    <ul className={styles.gamesLinks}>
                        <h2>All Games</h2>
                        <li><i className='fas fa-check-to-slot'></i><Link to="/slot-page">Slot Game</Link></li>
                        <li><i className='fas fa-compact-disc'></i><Link>Roulette</Link></li>
                        <li><i className='fas fa-circle-half-stroke'></i><Link>Coin Flip</Link></li>
                        <li><i className='fas fa-diamond'></i><Link>Blackjack</Link></li>
                        <li><i className='fas fa-chart-line'></i><Link>Crash</Link></li>
                    </ul>
                </section>
                
            </div>
            
            <Outlet />
        </div>
    );
}
 
export default Navbar;