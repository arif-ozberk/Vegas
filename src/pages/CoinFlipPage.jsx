import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/coinFlip_page_styles/CoinFlipPage.module.scss";

// Components
import GamePageTitle from '../components/shared_components/GamePageTitle';
import PageLoader from '../components/shared_components/PageLoader';
import BetInput from '../components/shared_components/BetInput';
import CoinContainer from '../components/coinFlip_page/CoinContainer';
import CoinFlipButtons from '../components/coinFlip_page/CoinFlipButtons';
import CoinFlipHistory from '../components/coinFlip_page/CoinFlipHistory';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Context
import { mainContext } from '../context/mainContext';

// Data
import gameInfoData from "../data/gameInfoData.json";

// Functions
import { convertButtons } from '../functions/convertButtons';

// Vegas Database
import gameHistoryDB from '../config/gameHistoryDB';
import liveBetsDB from '../config/liveBetsDB';


const CoinFlipPage = () => {

    const { PAGE_LOADING_DURATION, userBalance, setUserBalance, topNotificationOptions, bottomNotificationOptions, gameNotification, loggedUserDetails, liveBetsData, setLiveBetsData } = useContext(mainContext);

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

    const [historyData, setHistoryData] = useState([]);


    useEffect(() => {
        gameHistoryDB.fetchGameHistoryData("coin flip", setHistoryData);

        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


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
            convertButtons([ghostButtonRef, skullButtonRef], true);
    
            setTimeout(() => {  // Flipping phase

                const newHistoryElement = {
                    coinSymbol: coinFaces[randomNumber] === "ghost" ? "fas fa-ghost" : "fas fa-skull",
                    coinColor: coinFaces[randomNumber] === "ghost" ? "#273546" : "#1B2329"
                }
                const newHistoryArr = [...historyData.slice(1), newHistoryElement];
                setHistoryData(newHistoryArr);
                gameHistoryDB.updateGameHistoryData("coin flip", newHistoryArr);

                if(coinFaces[randomNumber] === coinFaceSelection) {  // Win condition
                    setUserBalance(userBalance => userBalance + (betAmount * 2));
                    gameNotification && toast.success(`It's ${coinFaceSelection}! - You win $${betAmount * 2}`, bottomNotificationOptions);

                    const latestBet = {
                        username: loggedUserDetails.username,
                        game_name: "Coin Flip",
                        multiplier: 2,
                        payout: betAmount * 2
                    }

                    liveBetsDB.updateLiveBetsData(liveBetsData, setLiveBetsData, latestBet);
                }

                else {  // Lose condition
                    gameNotification && toast.error("Better luck next time!", bottomNotificationOptions);
                }

                setSelectedFace("");
                convertButtons([ghostButtonRef, skullButtonRef], false);
            }, 4000);
        }, 1);
    }


    return (
        <GamePageWrapper>
            {isPageLoading ? <PageLoader /> : 

                <div className={`${styles.coinFlipPage} context-wrapper`}>
                    <GamePageTitle 
                        gameName={"Coin Flip"} 
                        gameInfoData={gameInfoData.gameInfos.coinFlipGame} 
                    />

                    <CoinContainer 
                        isFlip={isFlip} 
                        rotateDeg={rotateDeg} 
                    />

                    <CoinFlipHistory historyData={historyData} />

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