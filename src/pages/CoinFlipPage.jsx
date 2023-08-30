import React, { useState, useEffect, useContext } from 'react';

// Styles
import styles from "../styles/page_styles/coinFlip_page_styles/CoinFlipPage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GameOptions from '../components/shared_components/GameOptions';
import BetInput from '../components/shared_components/BetInput';
import CoinContainer from '../components/coinFlip_page/CoinContainer';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";


const CoinFlipPage = () => {

    const { PAGE_LOADING_DURATION } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);

    const [betAmount, setBetAmount] = useState(0);

    const [isFlip, setIsFlip] = useState(false);
    const [rotateDeg, setRotateDeg] = useState(0);
    const rotateDegs = [1800, 1980];


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    const handleCoinFlip = () => {
        setIsFlip(false);

        setTimeout(() => {
            const randomNumber = Math.round(Math.random());
            setRotateDeg(rotateDegs[randomNumber]);
            setIsFlip(true);
    
        }, 1);
    }



    return (
        <GamePageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.coinFlipPage} context-wrapper`}>
                    <div className={`${styles.coinFlipTitle} divider-bottom-xs`}>
                        <h1 className='title-main'>Coin Flip</h1>
                        <GameOptions gameType={gameInfoData.gameInfos.coinFlipGame} />
                    </div>

                    <CoinContainer isFlip={isFlip} rotateDeg={rotateDeg} />

                    <button onClick={handleCoinFlip}>Flip</button>

                    <BetInput 
                        betAmount={betAmount} 
                        setBetAmount={setBetAmount} 
                    />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default CoinFlipPage;