import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';

// Styles


//Components
import LoginToPlay from '../components/shared_components/LoginToPlay';
import Footer from '../components/shared_components/Footer';


const GamePageWrapper = ({ children }) => {

    const { isAuthenticated } = useAuth0()

    
    return (
        <div className={`page-container navbar-divider`}>

            {!isAuthenticated && 
                <LoginToPlay />
            }

            {isAuthenticated && 
            <>
                <ToastContainer />
                {children}
            </>}
            <Footer />
        </div>
    );
}
 
export default GamePageWrapper;