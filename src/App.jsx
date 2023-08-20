import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import './styles/globals.scss';

// Components
import Navbar from './components/shared_components/Navbar';
import HomePage from './pages/HomePage';
import SlotPage from './pages/SlotPage';
import LoginLoading from './components/shared_components/LoginLoading';

// Context
import { mainContext } from './context/mainContext';


function App() {

    const { isLoading } = useAuth0();
    
    
    return (
        <BrowserRouter>
            <mainContext.Provider value={{  }}>
                    <div className='App' style={{ height: isLoading ? "100vh" : "fit-content" }}>
                        <LoginLoading />

                        <Routes>
                            <Route path='/' element={<Navbar />}>
                                <Route index element={<HomePage />} />
                                <Route path='/slot-page' element={<SlotPage />} />
                            </Route>
                        </Routes>
                    </div>
            </mainContext.Provider>
        </BrowserRouter> 
    )
}

export default App;
