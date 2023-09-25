import React, { useRef, useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import './styles/globals.scss';

// Components
import LoginLoading from './components/shared_components/LoginLoading';

// Context
import { mainContext } from './context/mainContext';

// Mocks
import { topNotificationOptions, bottomNotificationOptions } from './mocks/NotificationOptions';

// Routes
import { router } from './routes/routes';


function App() {

    const PAGE_LOADING_DURATION = 1000;

    const { isLoading, user } = useAuth0();

    const [userBalance, setUserBalance] = useState(1000);
    const [gameNotification, setGameNotification] = useState(true);  // Game notification mute control state
    const [isInfoOn, setIsInfoOn] = useState(false);  // Game info popup control state


    useEffect(() => {
        if(user) {
            if (!localStorage.getItem(`${user.sub}`)) {
                localStorage.setItem(`${user.sub}`, 2000);
                setUserBalance(localStorage.getItem(`${user.sub}`));
            }
            else {
                setUserBalance(localStorage.getItem(`${user.sub}`));
            }
        }
    }, [user]);


    useEffect(() => {
        if(user) {
            localStorage.setItem(`${user.sub}`, userBalance);
        }
    }, [userBalance])
    
    
    return (
        <mainContext.Provider 
            value={{ PAGE_LOADING_DURATION, userBalance, setUserBalance, gameNotification, setGameNotification, isInfoOn, setIsInfoOn, topNotificationOptions, bottomNotificationOptions }}
        >
                <div className='App'>
                    <LoginLoading />
                    <RouterProvider router={router} />
                </div>
        </mainContext.Provider>
    );
}

export default App;
