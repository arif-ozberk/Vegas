import React, { useContext, useEffect, useState, useRef } from 'react';

// Styles
import styles from "../styles/page_styles/roulette_page_styles/RoulettePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GameOptions from '../components/shared_components/GameOptions';
import BetInput from '../components/shared_components/BetInput';
import RouletteSpinner from '../components/roulette_page/RouletteSpinner';
import RouletteResult from '../components/roulette_page/RouletteResult';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";
import rouletteSpinnerData from "../data/rouletteSpinnerData.json";


const RoulettePage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);

    const [betAmount, setBetAmount] = useState(0);

    const ROLLING_DURATION = 6200;

    const [randomRouletteIndex, setRandomRouletteIndex] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [resultMessage, setResultMessage] = useState(rouletteSpinnerData.rouletteElements[7]);
    const [rollingMessage, setRollingMessage] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);

    
    const handleRollButton = () => {
        setIsRolling(false);
        setRollingMessage(true);

        setTimeout(() => {
            setIsRolling(true);
            setResultMessage({});
            const randomNumber = Math.floor(Math.random() * (57 - 43 + 1)) + 43;
            setRandomRouletteIndex(randomNumber);

            setTimeout(() => {
                setResultMessage(rouletteSpinnerData.rouletteElements[randomNumber]);
                setRollingMessage(false);
            }, ROLLING_DURATION);
            
            console.log(randomNumber);
            console.log(rouletteSpinnerData.rouletteElements[randomNumber].elementNumber + rouletteSpinnerData.rouletteElements[randomNumber].elementColor);
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

                    <button onClick={handleRollButton}>Roll</button>

                    <BetInput betAmount={betAmount} setBetAmount={setBetAmount} />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default RoulettePage;