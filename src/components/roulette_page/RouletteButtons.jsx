import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Styles
import styles from "../../styles/page_styles/roulette_page_styles/RouletteButtons.module.scss";

// Components
import BetMessage from './BetMessage';


const RouletteButtons = ({ handleRollButton, currentBetAmount, redButtonRef, greenButtonRef, blackButtonRef, showBetMessage, betColor }) => {


    return (
        <div className={`${styles.rouletteButtons} divider-bottom-md-extended`}>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonColumn}>
                    <button
                        className={`${styles.rouletteButton} ${styles.redButton}`}
                        onClick={() => handleRollButton("red")}
                        ref={redButtonRef}
                    >
                        <p>8 - 14</p>
                        <p>Win 2x</p>
                    </button>

                    {showBetMessage && betColor === "red" && <BetMessage currentBetAmount={currentBetAmount} />}
                </div>
                
                <div className={styles.buttonColumn}>
                    <button
                        className={`${styles.rouletteButton} ${styles.greenButton}`}
                        onClick={() => handleRollButton("green")}
                        ref={greenButtonRef}
                    >
                        <p>0</p>
                        <p>Win 14x</p>
                    </button>

                    {showBetMessage && betColor === "green" && <BetMessage currentBetAmount={currentBetAmount} />}
                </div>
                
                <div className={styles.buttonColumn}>
                    <button
                        className={`${styles.rouletteButton} ${styles.blackButton}`}
                        onClick={() => handleRollButton("black")}
                        ref={blackButtonRef}
                    >
                        <p>1 - 7</p>
                        <p>Win 2x</p>
                    </button>

                    {showBetMessage && betColor === "black" && <BetMessage currentBetAmount={currentBetAmount} />}
                </div>
                
            </div>
        </div>
    );
}
 
export default RouletteButtons;