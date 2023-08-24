import React, { useContext } from 'react';

// Styles
import styles from "../../styles/shared_component_styles/BetInput.module.scss";

// Context
import { mainContext } from '../../context/mainContext';


const BetInput = ({ depositAmount, setDepositAmount }) => {

    const { userBalance } = useContext(mainContext);


    return (
        <div className={styles.betInput}>
            <p>Place your bet</p>
            <div className={styles.betInputContainer}>
                <i className='fas fa-sack-dollar'></i>
                <input type="number" value={depositAmount.toFixed(2)} onChange={(e) => setDepositAmount(e.target.value)} placeholder='$0,00' />
                <button onClick={() => setDepositAmount(0)}>Clear</button>
            </div>
            
            <div className={styles.buttons}>
                <button style={{ gridArea:" 1 / 1 / 2 / 4" }} onClick={() => setDepositAmount(depositAmount => depositAmount + 1)}>+$1</button>
                <button style={{ gridArea: "1 / 4 / 2 / 7" }} onClick={() => setDepositAmount(depositAmount => depositAmount + 5)}>+$5</button>
                <button style={{ gridArea: "1 / 7 / 2 / 10" }} onClick={() => setDepositAmount(depositAmount => depositAmount + 10)}>+$10</button>
                <button style={{ gridArea: "1 / 10 / 2 / 13" }}  onClick={() => setDepositAmount(depositAmount => depositAmount + 50)}>+$50</button>
                <button style={{ gridArea: "1 / 13 / 2 / 16" }} onClick={() => setDepositAmount(depositAmount => depositAmount + 100)}>+$100</button>
                <button style={{ gridArea: "2 / 1 / 3 / 6" }} onClick={() => setDepositAmount(depositAmount => depositAmount / 2)}>1/2</button>
                <button style={{ gridArea: "2 / 6 / 3 / 11" }} onClick={() => setDepositAmount(depositAmount => depositAmount * 2)}>x2</button>
                <button style={{ gridArea: "2 / 11 / 3 / 16" }} onClick={() => setDepositAmount(userBalance)}>Max</button>
            </div>
        </div>
    );
}
 
export default BetInput;