import React, { useState, useEffect, useRef, useContext } from 'react';

// Styles
import styles from "../styles/page_styles/slot_page_styles/SlotPage.module.scss";

// Components
import BetInput from '../components/shared_components/BetInput';

// Context
import { mainContext } from '../context/mainContext';

// Wrappers
import PageWrapper from '../wrappers/PageWrapper';


const SlotPage = () => {

    const { userBalance, setUserBalance } = useContext(mainContext);

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

    const [depositAmount, setDepositAmount] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll back to top on page changes
        resetButtonRef.current.disabled = true;
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
            }
            else if (value > 2) {
                console.log("Key: " + key + " Value: " + value);
                console.log("Congrats you win 10x multiplier");
                winMultiplier = 10;
            }
        });

        setUserBalance(userBalance => userBalance + winMultiplier * depositAmount);

        console.log("Win multiplier: " + winMultiplier + "x");
        console.log("Win amount: " + winMultiplier * depositAmount);
    }


    const handleRollButton = () => {
        if (depositAmount < 5) {
            window.alert("Please enter a valid amount! (At least $5)");
            return;
        }

        if (userBalance - depositAmount < 0) {
            window.alert("Please enter a valid amount!");
            return;
        }

        setUserBalance(userBalance => userBalance - depositAmount);
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
        <PageWrapper>
            <div className={`${styles.SlotPage} context-wrapper`}>

                <div className={styles.slotDisplay}>
                    <button ref={resetButtonRef} onClick={handleResetButton}>Reset</button>
                    <div className={styles.slotContainer}>
                        {slotRows.map((slotRow, index) => (
                            <div
                                className={styles.slotRow}
                                style={{
                                    transition: isRolling ? "transform 1.5s ease" : "none",
                                    transform: isRolling ? `translateY(-1120px)` : "translateY(0)",
                                    transitionDelay: isRolling ? `${index * 0.4}s` : "none",
                                }}
                                key={index}
                            >
                                {slotRow.map((slotItem, index) => (
                                    <div key={index} className={styles.slotItem}>
                                        {slotItem}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <button ref={rollButtonRef} onClick={handleRollButton}>Roll</button>
                </div>

                <BetInput depositAmount={depositAmount} setDepositAmount={setDepositAmount} />


            </div>
        </PageWrapper>
    );
}
 
export default SlotPage;