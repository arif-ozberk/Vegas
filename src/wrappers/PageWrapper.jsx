import React, { useContext } from 'react';

// Styles


// Components
import Footer from '../components/shared_components/Footer';

// Context
import { mainContext } from '../context/mainContext';


const PageWrapper = ({ children }) => {

    const { isInfoOn } = useContext(mainContext);


    return (
        <div className={`page-container navbar-divider`} style={isInfoOn ? { overflow: "hidden", height: "calc(100vh - 8rem)" } : {}}>
            {children}
            <Footer />
        </div>
    );
}
 
export default PageWrapper;