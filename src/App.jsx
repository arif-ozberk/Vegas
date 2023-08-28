import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import './styles/globals.scss';

// Components
import Navbar from './components/shared_components/Navbar';
import LoginLoading from './components/shared_components/LoginLoading';

// Pages
import HomePage from './pages/HomePage';
import SlotPage from './pages/SlotPage';
import ComingSoonPage from './pages/ComingSoonPage';

// Context
import { mainContext } from './context/mainContext';


function App() {

    const PAGE_LOADING_DURATION = 1000;

    const { isLoading, user } = useAuth0();

    const [userBalance, setUserBalance] = useState(1000);
    const [gameNotification, setGameNotification] = useState(true);
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
        <BrowserRouter>
            <mainContext.Provider 
                value={{ PAGE_LOADING_DURATION, userBalance, setUserBalance, gameNotification, setGameNotification, isInfoOn, setIsInfoOn }}
            >
                    <div className='App'>
                        <LoginLoading />

                        <Routes>
                            <Route path='/' element={<Navbar />}>
                                <Route index element={<HomePage />} />
                                <Route path='/slot-page' element={<SlotPage />} />
                                <Route path='/roulette-page' element={<ComingSoonPage />} />
                                <Route path='/crash-page' element={<ComingSoonPage />} />
                                <Route path='/dice-page' element={<ComingSoonPage />} />
                            </Route>
                        </Routes>
                    </div>
            </mainContext.Provider>
        </BrowserRouter> 
    )
}

export default App;
