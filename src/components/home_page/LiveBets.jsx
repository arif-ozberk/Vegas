import React, { useEffect, useState, useContext } from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/LiveBets.module.scss";

// Components
import Loader from '../shared_components/Loader';

// Vegas Database
import liveBetsDB from '../../config/liveBetsDB';

// Context
import { mainContext } from '../../context/mainContext';


const LiveBets = () => {

    const gamesList = {
        Slot: {
            gameName: "Slot",
            gameIcon: "fas fa-check-to-slot"
        },
        Roulette: {
            gameName: "Roulette",
            gameIcon: "fas fa-compact-disc"
        },
        CoinFlip: {
            gameName: "Coin Flip",
            gameIcon: "fas fa-circle-half-stroke"
        }
        // {
        //     gameName: "Crash",
        //     gameIcon: "fas fa-chart-line"
        // },
        // {
        //     gameName: "Dice",
        //     gameIcon: "fas fa-dice"
        // },
        // {
        //     gameName: "High-Low",
        //     gameIcon: "fas fa-right-left"
        // },
        // {
        //     gameName: "Minefield",
        //     gameIcon: "fas fa-land-mine-on"
        // }
    };

    const { liveBetsData, setLiveBetsData } = useContext(mainContext);

    const [isDataLoading, setIsDataLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        liveBetsDB.fetchLiveBetsData(setLiveBetsData, setErrorMessage, setIsDataLoading);  // Fetch inital data on page load
        liveBetsDB.realtimeLiveBets(setLiveBetsData, setErrorMessage, setIsDataLoading);  // Track real-time changes
    }, []);


    return (
        <>
            {errorMessage && <p>{errorMessage.message}</p>}
            {isDataLoading && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "24rem" }}><Loader /></div>}
            {!isDataLoading && errorMessage && 
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "24rem" }}>
                    <p style={{ color: "#ffffff" }}>{errorMessage}</p>
                </div>
            }
            {!isDataLoading && !errorMessage &&
                <div className={`${styles.liveBets} divider-bottom-md-extended`}>
                    <h1 className={`title-second divider-bottom-xs`}>Live Bets</h1>
                    <div className={styles.liveBetsFrame}>
                        <div className={`${styles.liveBetsContainer}`}>
                            {liveBetsData && liveBetsData?.map((item, index) => (
                                <div className={styles.betCard} key={item.id}>
                                    <p><i className='fas fa-user'></i>{item.username}</p>
                                    <p>
                                        <i className={gamesList[`${item.game_name.replaceAll(" ", "")}`].gameIcon}></i>
                                        Game: {gamesList[`${item.game_name.replaceAll(" ", "")}`].gameName}
                                    </p>
                                    <p><span className={styles.multiplier}>Multiplier: {item.multiplier}x</span></p>
                                    <p><i className='fa fa-sack-dollar'></i>Payout: ${item.payout.toFixed(2)}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            }
        </>
        
    );
}
 
export default LiveBets;