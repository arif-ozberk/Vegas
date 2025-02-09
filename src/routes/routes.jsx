import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

// Components
import Navbar from '../components/shared_components/Navbar';

// Pages
import HomePage from '../pages/HomePage';
import BalancePage from '../pages/BalancePage';
import SlotPage from '../pages/SlotPage';
import RoulettePage from '../pages/RoulettePage';
import CoinFlipPage from '../pages/CoinFlipPage';
import CrashPage from '../pages/CrashPage';
import ComingSoonPage from '../pages/ComingSoonPage';


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
        routeElement: <ComingSoonPage />
    },
    {
        routePath: "/dice-page",
        routeElement: <ComingSoonPage />
    },
    {
        routePath: "/blackjack-page",
        routeElement: <ComingSoonPage />
    },
    {
        routePath: "/highlow-page",
        routeElement: <ComingSoonPage />
    },
    {
        routePath: "/minefield-page",
        routeElement: <ComingSoonPage />
    }
];


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Navbar />} >
            <Route index element={<HomePage />} />

            {routes.map((route, index) => (
                <Route key={route.routePath} path={route.routePath} element={route.routeElement} />
            ))}
        </Route>
    )
)