import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/slot_page_styles/SlotPage.module.scss";
import 'react-toastify/dist/ReactToastify.css';

// Components
import GamePageTitle from '../components/shared_components/GamePageTitle';
import PageLoader from '../components/shared_components/PageLoader';
import SlotButtons from '../components/slot_page/SlotButtons';
import SlotContainer from '../components/slot_page/SlotContainer';
import BetInput from '../components/shared_components/BetInput';

// Context
import { mainContext } from '../context/mainContext';

// Wrappers
import GamePageWrapper from '../wrappers/GamePageWrapper';

// Data
import gameInfoData from "../data/gameInfoData.json";


const SlotPage = () => {

    const { userBalance, setUserBalance, PAGE_LOADING_DURATION, gameNotification, setGameNotification, topNotificationOptions, bottomNotificationOptions } = useContext(mainContext);

    const slotSelections = ['🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍌'];
    const [slotRows, setSlotRows] = useState([
        ['💸', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍌', "Last"],
        ['💸', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍌', "Last"],
        ['💸', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍒', '🍊', '🍇', '🍋', '🍉', '🍓', '🍌', "Last"],
    ]);
    const [finalSlot, setFinalSlot] = useState([]);
    const finalLocaleSlot = [];

    const [isRolling, setIsRolling] = useState(false);

    const rollButtonRef = useRef();
    const resetButtonRef = useRef();
    const slotItemRef = useRef();

    const [betAmount, setBetAmount] = useState(0);

    const [isPageLoading, setIsPageLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes

        setTimeout(() => {
            setIsPageLoading(false); // Page loader executes after xx seconds
        }, PAGE_LOADING_DURATION);
    }, []);


    const randomizeLastSlotItem = () => {
        for (let slotRow of slotRows) {
            const selectedSlotItem = slotSelections[Math.floor(Math.random() * slotSelections.length)];
            slotRow[slotRow.length - 1] = selectedSlotItem;

            finalLocaleSlot.push(selectedSlotItem);
        }
        setFinalSlot(finalLocaleSlot);
    }


    const calculateWin = () => {
        const slotLocaleItemAmounts = new Map([
            ["🍒", 0],
            ["🍊", 0],
            ["🍇", 0],
            ["🍋", 0],
            ["🍉", 0],
            ["🍓", 0],
            ["🍌", 0]
        ]);

        for (let i = 0; i < finalLocaleSlot.length; i++) {
            switch (finalLocaleSlot[i]) {
                case "🍒":
                    slotLocaleItemAmounts.set("🍒", slotLocaleItemAmounts.get("🍒") + 1);
                    break;
                case "🍊":
                    slotLocaleItemAmounts.set("🍊", slotLocaleItemAmounts.get("🍊") + 1);
                    break;
                case "🍇":
                    slotLocaleItemAmounts.set("🍇", slotLocaleItemAmounts.get("🍇") + 1);
                    break;
                case "🍋":
                    slotLocaleItemAmounts.set("🍋", slotLocaleItemAmounts.get("🍋") + 1);
                    break;
                case "🍉":
                    slotLocaleItemAmounts.set("🍉", slotLocaleItemAmounts.get("🍉") + 1);
                    break;
                case "🍓":
                    slotLocaleItemAmounts.set("🍓", slotLocaleItemAmounts.get("🍓") + 1);
                    break;
                case "🍌":
                    slotLocaleItemAmounts.set("🍌", slotLocaleItemAmounts.get("🍌") + 1);
                    break;
            }
        }

        let winMultiplier = 0;
        slotLocaleItemAmounts.forEach((value, key) => {
            if (value > 1 && value < 3) {
                winMultiplier = 3;
                gameNotification && toast.success(`${winMultiplier}x - You win $${betAmount * winMultiplier}!`, bottomNotificationOptions);

            }
            else if (value > 2) {
                winMultiplier = 10;
                gameNotification && toast.success(`${winMultiplier}x - You win $${betAmount * winMultiplier}!`, bottomNotificationOptions);
            }
        });

        if(winMultiplier === 0) {
            gameNotification && toast.error(`"Better luck next time!"`, bottomNotificationOptions);
        }

        setUserBalance(userBalance => userBalance + winMultiplier * betAmount);
    }


    const handleRollButton = () => {
        resetButtonRef.current.disabled = true;

        if (betAmount < 1) {
            toast.error("Please enter a valid amount! (At least $1)", topNotificationOptions);
            return;
        }

        if (userBalance - betAmount < 0) {
            toast.error("Please enter a valid amount!", topNotificationOptions);
            return;
        }

        setUserBalance(userBalance => userBalance - betAmount);
        randomizeLastSlotItem();
        rollButtonRef.current.disabled = true;
        setIsRolling(true);

        setTimeout(() => {
            resetButtonRef.current.disabled = false;
            calculateWin();
        }, 3000);
    }


    const handleResetButton = () => {
        setIsRolling(false);
        rollButtonRef.current.disabled = false;
        resetButtonRef.current.disabled = true;
        setFinalSlot([]);
    }


    return (
        <GamePageWrapper>
            {isPageLoading ? <PageLoader /> :

                <div className={`${styles.SlotPage} context-wrapper`}>
                    <GamePageTitle 
                        gameName={"Slot"} 
                        gameInfoData={gameInfoData.gameInfos.slotGame} 
                    />
                    
                    <div className={`${styles.slotDisplay} divider-bottom-md`}>
                        <SlotContainer 
                            slotRows={slotRows} 
                            isRolling={isRolling} 
                            slotItemRef={slotItemRef} 
                        />

                        <SlotButtons 
                            rollButtonRef={rollButtonRef} 
                            resetButtonRef={resetButtonRef} 
                            handleRollButton={handleRollButton} 
                            handleResetButton={handleResetButton} 
                            isRolling={isRolling}
                        />
                    </div>

                    <BetInput betAmount={betAmount} setBetAmount={setBetAmount} />
                </div>
            }
        </GamePageWrapper>
    );
}
 
export default SlotPage;