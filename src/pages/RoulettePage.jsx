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

    const ROLLING_DURATION = 6200;

    const [randomRouletteIndex, setRandomRouletteIndex] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [resultMessage, setResultMessage] = useState(rouletteSpinnerData.rouletteElements[7]);
    const [rollingMessage, setRollingMessage] = useState(false);

    const redButtonRef = useRef();
    const greenButtonRef = useRef();
    const blackButtonRef = useRef();


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


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

        setUserBalance(userBalance => userBalance - betAmount);

        setTimeout(() => {
            setIsRolling(true);
            setResultMessage({});
            const randomNumber = Math.floor(Math.random() * (57 - 43 + 1)) + 43;
            setRandomRouletteIndex(randomNumber);
            buttonDisableTrue();

            setTimeout(() => {
                setResultMessage(rouletteSpinnerData.rouletteElements[randomNumber]);
                setRollingMessage(false);
                buttonDisableFalse();

                if (userBetColor === rouletteSpinnerData.rouletteElements[randomNumber].elementColor) {
                    console.log("Win");
                    setUserBalance(userBalance => userBalance + (rouletteSpinnerData.rouletteElements[randomNumber].multiplier * betAmount));
                    gameNotification && toast.success(`${rouletteSpinnerData.rouletteElements[randomNumber].multiplier}x - You win $${rouletteSpinnerData.rouletteElements[randomNumber].multiplier * betAmount}`, bottomNotificationOptions);
                }
                else {
                    console.log("Lose");
                    gameNotification && toast.error(`"Better luck next time!"`, bottomNotificationOptions);
                }

            }, ROLLING_DURATION);
        }, 10);
    }


    return (
        <GamePageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.roulettePage} context-wrapper`}>
                    <div className={`${styles.rouletteTitle} divider-bottom-sm`}>
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

                    <BetInput 
                        betAmount={betAmount} 
                        setBetAmount={setBetAmount} 
                    />

                    <RouletteButtons 
                        handleRollButton={handleRollButton} 
                        isRolling={isRolling}
                        betAmount={betAmount}
                        redButtonRef={redButtonRef}
                        greenButtonRef={greenButtonRef}
                        blackButtonRef={blackButtonRef}
                    />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default RoulettePage;