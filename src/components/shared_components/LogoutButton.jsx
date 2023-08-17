import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/shared_component_styles/AuthButtons.module.scss";


const LogoutButton = ({ setIsDropdownOpen }) => {

    const { logout, isAuthenticated } = useAuth0();


    const handleLogoutButtonClick = () => {
        logout();
        setIsDropdownOpen(false);
    }


    return (
        isAuthenticated && (
            <button className={styles.logoutButton} onClick={handleLogoutButtonClick}>
                Logout
            </button>
        )
    );
}
 
export default LogoutButton;