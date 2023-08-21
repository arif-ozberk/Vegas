import React, { useEffect, useState, useContext } from 'react';

// Context
import { mainContext } from '../context/mainContext';

// Components
import PageLoader from '../components/shared_components/PageLoader';


const ComingSoonPage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after 2 seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <div className='page-container' style={{ backgroundColor: "#0A1119", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {isPageLoading && <PageLoader />}
            {!isPageLoading && <p style={{ fontSize: "2rem", color: "white" }}>Coming Soon...</p>}
        </div>
    );
}
 
export default ComingSoonPage;