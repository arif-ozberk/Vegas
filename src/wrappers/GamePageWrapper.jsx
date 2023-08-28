import React from 'react';

// Styles


//Components
import Footer from '../components/shared_components/Footer';


const GamePageWrapper = ({ children }) => {
    
    return (
        <div className={`page-container navbar-divider`}>
            {children}
            <Footer />
        </div>
    );
}
 
export default GamePageWrapper;