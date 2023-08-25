import React, { useContext } from 'react';

// Styles
import styles from "../../styles/shared_component_styles/BetInput.module.scss";

// Context
import { mainContext } from '../../context/mainContext';


const BetInput = ({ betAmount, setBetAmount }) => {

    const { userBalance } = useContext(mainContext);


    return (
        <div className={styles.betInput}>
            <p>Place your bet</p>
            <div className={styles.betInputContainer}>
                <i className='fas fa-sack-dollar'></i>
                <input type="number" value={betAmount.toFixed(2)} onChange={(e) => setBetAmount(Number(e.target.value))} placeholder='$0,00' />
                <button onClick={() => setBetAmount(0)}>Clear</button>
            </div>
            
            <div className={styles.buttons}>
                <button style={{ gridArea:" 1 / 1 / 2 / 4" }} onClick={() => setBetAmount(betAmount => Number(betAmount) + 1)}>+$1</button>
                <button style={{ gridArea: "1 / 4 / 2 / 7" }} onClick={() => setBetAmount(betAmount => Number(betAmount + 5))}>+$5</button>
                <button style={{ gridArea: "1 / 7 / 2 / 10" }} onClick={() => setBetAmount(betAmount => Number(betAmount + 10))}>+$10</button>
                <button style={{ gridArea: "1 / 10 / 2 / 13" }}  onClick={() => setBetAmount(betAmount => Number(betAmount + 50))}>+$50</button>
                <button style={{ gridArea: "1 / 13 / 2 / 16" }} onClick={() => setBetAmount(betAmount => Number(betAmount + 100))}>+$100</button>
                <button style={{ gridArea: "2 / 1 / 3 / 6" }} onClick={() => setBetAmount(betAmount => Number(betAmount / 2))}>1/2</button>
                <button style={{ gridArea: "2 / 6 / 3 / 11" }} onClick={() => setBetAmount(betAmount => Number(betAmount * 2))}>x2</button>
                <button style={{ gridArea: "2 / 11 / 3 / 16" }} onClick={() => setBetAmount(Number(userBalance))}>Max</button>
            </div>
        </div>
    );
}
 
export default BetInput;