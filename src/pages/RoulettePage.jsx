import React, { useContext, useEffect, useState, useRef } from 'react';

// Styles
import styles from "../styles/page_styles/roulette_page_styles/RoulettePage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GameOptions from '../components/shared_components/GameOptions';
import BetInput from '../components/shared_components/BetInput';
import RouletteSpinner from '../components/roulette_page/RouletteSpinner';

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

    const [randomRouletteIndex, setRandomRouletteIndex] = useState(0);
    const [isRolling, setIsRolling] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);

    



    const handleRollButton = async () => {
        setIsRolling(false);

        setTimeout(() => {
            setIsRolling(true);
            const randomNumber = Math.floor(Math.random() * (57 - 43 + 1)) + 43;
            setRandomRouletteIndex(randomNumber);
            console.log(randomNumber);
            console.log(rouletteSpinnerData.rouletteElements[randomNumber].elementNumber + rouletteSpinnerData.rouletteElements[randomNumber].elementColor);
        }, 10)
        

        
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

                    <RouletteSpinner randomRouletteIndex={randomRouletteIndex} isRolling={isRolling} />

                    <button onClick={handleRollButton}>Roll</button>

                    <BetInput betAmount={betAmount} setBetAmount={setBetAmount} />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default RoulettePage;