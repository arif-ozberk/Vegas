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

    const [userInfo, setUserInfo] = useState("");


    useEffect(() => {
        user ? setUserInfo(user) : "";
    }, [isAuthenticated]);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleDropdownButton = () => {
        setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    }


    return (
        <div>
            <div className={styles.navbar}>
                <section className={styles.topBar}>
                    <div className={styles.topBarLogo}>
                        <img src={logoImage} alt="vegas-logo-image" />
                        <h1>Vegas</h1>
                    </div>
                    
                    <ul className={styles.topBarButtons}>
                        <li><LoginButton /></li>
                        <li><SignUpButton /></li>

                        {isAuthenticated && <li className={styles.welcomeMessage}>
                            <img src={userInfo.picture} alt="logged-user-image" />
                            <p>{userInfo.nickname}</p>
                            <i className='fas fa-chevron-down' onClick={handleDropdownButton}></i>
                            <div className={styles.userDropdown} style={{ display: isDropdownOpen ? "flex" : "none" }}>
                                <a href="#" onClick={() => setIsDropdownOpen(false)}><i className='fas fa-user'></i>Profile</a>
                                <a href="#" onClick={() => setIsDropdownOpen(false)}><i className='fas fa-gear'></i>Settings</a>
                                <LogoutButton setIsDropdownOpen={setIsDropdownOpen} />
                            </div>
                        </li>}
                    </ul>
                </section>

                <section className={styles.sideBar}>
                    <ul style={{ color: "white" }}>
                        <li>zort</li>
                        <li>zort</li>
                        <li>zort</li>
                        <li>zort</li>
                    </ul>
                </section>
                
            </div>
            
            <Outlet />
        </div>
    );
}
 
export default Navbar;