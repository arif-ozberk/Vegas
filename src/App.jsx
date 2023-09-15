import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import './styles/globals.scss';

// Components
import Navbar from './components/shared_components/Navbar';
import LoginLoading from './components/shared_components/LoginLoading';

// Pages
import HomePage from './pages/HomePage';
import BalancePage from './pages/BalancePage';
import ComingSoonPage from './pages/ComingSoonPage';

import SlotPage from './pages/SlotPage';
import RoulettePage from './pages/RoulettePage';
import CoinFlipPage from './pages/CoinFlipPage';
import CrashPage from './pages/CrashPage';

// Context
import { mainContext } from './context/mainContext';

// Mocks
import { topNotificationOptions, bottomNotificationOptions } from './mocks/NotificationOptions';


function App() {

    const PAGE_LOADING_DURATION = 1000;

    const { isLoading, user } = useAuth0();

    const [userBalance, setUserBalance] = useState(1000);
    const [gameNotification, setGameNotification] = useState(true);  // Game notification mute control state
    const [isInfoOn, setIsInfoOn] = useState(false);  // Game info popup control state

    
    const routes = [
        {
            routePath: "/balance-page",
            routeElement: <BalancePage />
        },
        {
            routePath: "/slot-page",
            routeElement: <SlotPage />
        },
        {
            routePath: "/roulette-page",
            routeElement: <RoulettePage />
        },
        {
            routePath: "/coin-flip-page",
            routeElement: <CoinFlipPage />
        },
        {
            routePath: "/crash-page",
            routeElement: <CrashPage />
        },
        {
            routePath: "/dice-page",
            routeElement: <ComingSoonPage />
        }
    ];


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Navbar />} >
                <Route index element={<HomePage />} />

                {routes.map((route, index) => (
                    <Route key={route.routePath} path={route.routePath} element={route.routeElement} />
                ))}
            </Route>
        )
    )


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
