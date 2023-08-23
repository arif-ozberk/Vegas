import React, { useEffect, useState } from 'react';

// Styles
import styles from "../../styles/page_styles/home_page_styles/LiveBets.module.scss";

// Components
import Loader from '../shared_components/Loader';


const LiveBets = () => {

    const BASE_URL = "https://random-data-api.com/api/v2/users";

    const gamesList = [
        "Slot",
        "Roulette",
        "Coin Flip",
        "Crash",
        "Dice",
        "High-Low",
        "Minefield",
        "Slot",
        "Roulette",
        "Coin Flip"
    ];

    const [userData, setUserData] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    let userCount;
    

    const fetchData = async (API_URL) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error("Please reload the page...");
            const users = await response.json();
            setUserData(users);
            userCount = users.length;
        }
        catch(error) {
            setErrorMessage(error.message);
        }
        finally {
            setIsDataLoading(false);
        }
    }


    const fetchSingleData = async () => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) throw Error("Please reload the page...");
            const user = await response.json();
            setUserData(prev => [...prev, user]);
            
        }
        catch (error) {
            console.log(error.message);
        }
        finally {
            userCount ++;
        }
    }


    useEffect(() => {
        fetchData(BASE_URL + "?size=5");

        // setInterval(() => {
        //     if (userCount === 10) {
        //         setUserData(prev => {
        //             userCount = 5;
        //             const splicedData = [...prev];
        //             splicedData.splice(0, 5);
        //             return splicedData;
        //         })
        //     }

        //     else {
        //         fetchSingleData();
        //     }
        // }, 6000);
    }, []);


    return (
        <>
            {isDataLoading && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "24rem" }}><Loader /></div>}
            {!isDataLoading && errorMessage && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "24rem" }}><p style={{ color: "#ffffff" }}>{errorMessage}</p></div>}
            {!isDataLoading && !errorMessage &&
                <div className={`${styles.liveBets} divider-bottom-md-extended`}>
                    <h1 className={`title-second divider-bottom-xs`}>Live Bets</h1>
                    <div className={styles.liveBetsFrame}>
                        <div className={`${styles.liveBetsContainer}`}>
                            {userData?.map((user, index) => (
                                <div className={styles.betCard} key={user.id}>
                                    <p><i className='fas fa-user'></i> {user.username}</p>
                                    <p><i className='fas fa-dice'></i>Game: {gamesList[index]}</p>
                                    <p><span className={styles.multiplier}>Multiplier: {Number(user.address.zip_code.slice(0, 1)) + 2}x</span></p>
                                    <p><i className='fa fa-sack-dollar'></i>Payout: ${user.address.zip_code.slice(0, 2)}.{user.address.zip_code.slice(2, 4)}</p>
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