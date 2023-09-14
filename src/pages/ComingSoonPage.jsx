import React, { useEffect, useState, useContext } from 'react';

// Context
import { mainContext } from '../context/mainContext';

// Components
import PageLoader from '../components/shared_components/PageLoader';

// Wrappers
import PageWrapper from '../wrappers/PageWrapper';


const ComingSoonPage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after 2 seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    return (
        <PageWrapper>
            {isPageLoading ? <PageLoader /> :
                <div style={{ backgroundColor: "#0A1119", height: "calc(100vh - 8rem)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: "2rem", color: "white" }}>Coming Soon...</p>
                </div>
            }
        </PageWrapper>
    );
}
 
export default ComingSoonPage;