import React, { useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/roulette_page_styles/RoulettePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GameOptions from '../components/shared_components/GameOptions';
import BetInput from '../components/shared_components/BetInput';
import RouletteSpinner from '../components/roulette_page/RouletteSpinner';
import RouletteResult from '../components/roulette_page/RouletteResult';
import RouletteButtons from '../components/roulette_page/RouletteButtons';
import RouletteHistory from '../components/roulette_page/RouletteHistory';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";
import rouletteSpinnerData from "../data/rouletteSpinnerData.json";


const RoulettePage = () => {

    const { userBalance, setUserBalance, PAGE_LOADING_DURATION, topNotificationOptions, bottomNotificationOptions, gameNotification } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);

    const [betAmount, setBetAmount] = useState(0);
    const [currentBetAmount, setCurrentBetAmount] = useState(0);

    const ROLLING_DURATION = 6200;

    const [randomRouletteIndex, setRandomRouletteIndex] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [resultMessage, setResultMessage] = useState(rouletteSpinnerData.rouletteElements[7]);
    const [rollingMessage, setRollingMessage] = useState(false);
    const [showBetMessage, setShowBetMessage] = useState(false);
    const [betColor, setBetColor] = useState("");

    const redButtonRef = useRef();
    const greenButtonRef = useRef();
    const blackButtonRef = useRef();

    const [historyData, setHistoryData] = useState([]);
    const mockHistory = [
        {
            elementNumber: 3,
            elementColor: "#353942"
        },
        {
            elementNumber: 11,
            elementColor: "#FF5050"
        },
        {
            elementNumber: 13,
            elementColor: "#FF5050"
        },
        {
            elementNumber: 5,
            elementColor: "#353942"
        },
        {
            elementNumber: 9,
            elementColor: "#FF5050"
        },
        {
            elementNumber: 0,
            elementColor: "#30C149"
        },
        {
            elementNumber: 14,
            elementColor: "#FF5050"
        },
        {
            elementNumber: 1,
            elementColor: "#353942"
        }
    ];


    useEffect(() => {
        if(!localStorage.getItem("rouletteHistory")) {
            localStorage.setItem("rouletteHistory", JSON.stringify(mockHistory));
            setHistoryData(JSON.parse(localStorage.getItem("rouletteHistory")));
        }
        else {
            setHistoryData(JSON.parse(localStorage.getItem("rouletteHistory")));
        }

        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    useEffect(() => {  // Update roulette history every time new element updates
        localStorage.setItem("rouletteHistory", JSON.stringify(historyData));
    }, [historyData]);


    const buttonDisableTrue = () => {
        redButtonRef.current.disabled = true;
        greenButtonRef.current.disabled = true;
        blackButtonRef.current.disabled = true;
    }


    const buttonDisableFalse = () => {
        redButtonRef.current.disabled = false;
        greenButtonRef.current.disabled = false;
        blackButtonRef.current.disabled = false;
    }

    
    const handleRollButton = (userBetColor) => {
        if (betAmount < 1) {
            toast.error("Please enter a valid amount! (At least $1)", topNotificationOptions);
            return;
        }

        if (userBalance - betAmount < 0) {
            toast.error("Please enter a valid amount!", topNotificationOptions);
            return;
        }

        setIsRolling(false);
        setRollingMessage(true);
        setShowBetMessage(true);
        setBetColor(userBetColor);
        window.scrollTo(0, 0);

        setUserBalance(userBalance => userBalance - betAmount);
        setCurrentBetAmount(betAmount);

        setTimeout(() => {  // Click phase
            setIsRolling(true);
            setResultMessage({});
            const randomNumber = Math.floor(Math.random() * (57 - 43 + 1)) + 43;
            setRandomRouletteIndex(randomNumber);
            buttonDisableTrue();

            setTimeout(() => {  // Rolling phase
                setResultMessage(rouletteSpinnerData.rouletteElements[randomNumber]);
                setRollingMessage(false);
                buttonDisableFalse();
                setShowBetMessage(false);

                const newElement = {
                    elementNumber: rouletteSpinnerData.rouletteElements[randomNumber].elementNumber,
                    elementColor: rouletteSpinnerData.rouletteElements[randomNumber].elementColorCode
                }
                const newItems = [...historyData.slice(1), newElement];
                setHistoryData(newItems);

                if (userBetColor === rouletteSpinnerData.rouletteElements[randomNumber].elementColor) {
                    if(userBetColor === "red" || userBetColor === "black") {
                        setUserBalance(userBalance => userBalance + (2 * betAmount));
                        gameNotification && toast.success(`2x - You win $${2 * betAmount}!`, bottomNotificationOptions);
                    }
                    else {
                        setUserBalance(userBalance => userBalance + (14 * betAmount));
                        gameNotification && toast.success(`14x - You win $${14 * betAmount}!`, bottomNotificationOptions);
                    }
                }

                else {
                    gameNotification && toast.error(`"Better luck next time!"`, bottomNotificationOptions);
                }

            }, ROLLING_DURATION);
        }, 10);
    }


    return (
        <GamePageWrapper>
            {isPageLoading ? <PageLoader /> :

                <div className={`${styles.roulettePage} context-wrapper`}>
                    <div className={`${styles.rouletteTitle} divider-bottom-xs`}>
                        <h1 className='title-main'>Roulette</h1>
                        <GameOptions gameType={gameInfoData.gameInfos.rouletteGame} />
                    </div>

                    <RouletteResult 
                        resultMessage={resultMessage} 
                        rollingMessage={rollingMessage} 
                    />

                    <RouletteSpinner 
                        randomRouletteIndex={randomRouletteIndex} 
                        isRolling={isRolling} 
                        ROLLING_DURATION={ROLLING_DURATION} 
                    />

                    <RouletteHistory historyData={historyData} />

                    <BetInput 
                        betAmount={betAmount} 
                        setBetAmount={setBetAmount} 
                    />

                    <RouletteButtons 
                        handleRollButton={handleRollButton} 
                        redButtonRef={redButtonRef}
                        greenButtonRef={greenButtonRef}
                        blackButtonRef={blackButtonRef}
                        showBetMessage={showBetMessage}
                        betColor={betColor}
                        currentBetAmount={currentBetAmount}
                    />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default RoulettePage;