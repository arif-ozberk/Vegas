import React, { useState, useEffect, useRef, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Styles
import styles from "../styles/page_styles/slot_page_styles/SlotPage.module.scss";
import 'react-toastify/dist/ReactToastify.css';

// Components
import PageLoader from '../components/shared_components/PageLoader';
import SlotResult from '../components/slot_page/SlotResult';
import SlotButtons from '../components/slot_page/SlotButtons';
import SlotContainer from '../components/slot_page/SlotContainer';
import BetInput from '../components/shared_components/BetInput';

// Context
import { mainContext } from '../context/mainContext';

// Wrappers
import PageWrapper from '../wrappers/PageWrapper';


const SlotPage = () => {

    const { userBalance, setUserBalance, PAGE_LOADING_DURATION } = useContext(mainContext);

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

    const [resultMessage, setResultMessage] = useState("");
    const [isWin, setIsWin] = useState(null);

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
                console.log("Key: " + key + " Value: " + value);
                console.log("Congrats you win 3x multiplier");
                winMultiplier = 3;
                setResultMessage(`${winMultiplier}x - You win $${betAmount * winMultiplier}!`);
                setIsWin(true);
            }
            else if (value > 2) {
                console.log("Key: " + key + " Value: " + value);
                console.log("Congrats you win 10x multiplier");
                winMultiplier = 10;
                setResultMessage(`${winMultiplier}x - You win $${betAmount * winMultiplier}!`);
                setIsWin(true);
            }
        });

        if(winMultiplier === 0) {
            setResultMessage("Better luck next time!");
            setIsWin(false);
        }

        setUserBalance(userBalance => userBalance + winMultiplier * betAmount);

        console.log("Win multiplier: " + winMultiplier + "x");
        console.log("Win amount: " + winMultiplier * betAmount);
    }


    const handleRollButton = () => {
        resetButtonRef.current.disabled = true;
        setIsWin(null);

        if (betAmount < 1) {
            toast.error("Please enter a valid amount! (At least $1)", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (userBalance - betAmount < 0) {
            toast.error("Please enter a valid amount!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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

        setResultMessage("");
        setFinalSlot([]);
    }


    return (
        <PageWrapper>
            {isPageLoading && <PageLoader />}

            {!isPageLoading && 
                <div className={`${styles.SlotPage} context-wrapper`}>
                    <ToastContainer />
                    <h1 className='title-main'>Slot</h1>
                    <SlotResult resultMessage={resultMessage} isWin={isWin} />

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
        </PageWrapper>
    );
}
 
export default SlotPage;