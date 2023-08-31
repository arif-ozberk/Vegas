import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/coinFlip_page_styles/CoinFlipPage.module.scss";

// Components
import PageLoader from '../components/shared_components/PageLoader';
import GameOptions from '../components/shared_components/GameOptions';
import BetInput from '../components/shared_components/BetInput';
import CoinContainer from '../components/coinFlip_page/CoinContainer';
import CoinFlipButtons from '../components/coinFlip_page/CoinFlipButtons';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";


const CoinFlipPage = () => {

    const { PAGE_LOADING_DURATION, userBalance, setUserBalance, topNotificationOptions, bottomNotificationOptions, gameNotification } = useContext(mainContext);

    const [isPageLoading, setIsPageLoading] = useState(true);

    const [betAmount, setBetAmount] = useState(0);
    const [currentBetAmount, setCurrentBetAmount] = useState(0);

    const [isFlip, setIsFlip] = useState(false);
    const [selectedFace, setSelectedFace] = useState("");
    const [rotateDeg, setRotateDeg] = useState(0);
    const rotateDegs = [1800, 1980];
    const coinFaces = ["ghost", "skull"];

    const ghostButtonRef = useRef();
    const skullButtonRef = useRef();


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    const disableButtons = () => {
        ghostButtonRef.current.disabled = true;
        skullButtonRef.current.disabled = true;
    }


    const activateButtons = () => {
        ghostButtonRef.current.disabled = false;
        skullButtonRef.current.disabled = false;
    }


    const handleCoinFlip = (coinFaceSelection) => {
        if (betAmount < 1) {
            toast.error("Please enter a valid amount! (At least $1)", topNotificationOptions);
            return;
        }

        if (userBalance - betAmount < 0) {
            toast.error("Please enter a valid amount!", topNotificationOptions);
            return;
        }

        setIsFlip(false);
        setSelectedFace(coinFaceSelection);

        setTimeout(() => {  // Click phase
            const randomNumber = Math.round(Math.random());
            setRotateDeg(rotateDegs[randomNumber]);
            setIsFlip(true);
            setUserBalance(userBalance => userBalance - betAmount);
            setCurrentBetAmount(betAmount);
            window.scrollTo(0, 0);
            disableButtons();
    
            setTimeout(() => {  // Flipping phase
                if(coinFaces[randomNumber] === coinFaceSelection) {
                    setUserBalance(userBalance => userBalance + (betAmount * 2));
                    gameNotification && toast.success(`It's ${coinFaceSelection}! - You win $${betAmount * 2}`, bottomNotificationOptions);
                }
                else {
                    gameNotification && toast.error("Better luck next time!", bottomNotificationOptions);
                }
                setSelectedFace("");
                activateButtons();
            }, 4000);
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

                    <CoinContainer 
                        isFlip={isFlip} 
                        rotateDeg={rotateDeg} 
                    />

                    <BetInput 
                        betAmount={betAmount} 
                        setBetAmount={setBetAmount} 
                    />

                    <CoinFlipButtons 
                        handleCoinFlip={handleCoinFlip} 
                        selectedFace={selectedFace}
                        currentBetAmount={currentBetAmount}
                        ghostButtonRef={ghostButtonRef}
                        skullButtonRef={skullButtonRef}
                    />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default CoinFlipPage;