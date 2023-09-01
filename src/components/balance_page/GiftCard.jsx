import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

// Styles
import styles from "../../styles/page_styles/balance_page_styles/GiftCard.module.scss";

// Context
import { mainContext } from '../../context/mainContext';


const GiftCard = () => {

    const { userBalance, setUserBalance, topNotificationOptions } = useContext(mainContext);

    const [codeInput, setCodeInput] = useState("");


    const handleCodeInput = (e) => {
        setCodeInput(e.target.value);
    }


    const handleSubmitClick = () => {
        if(codeInput === "GJ35K7") {
            setUserBalance(userBalance => Number(userBalance) + 500);
            toast.success("$500 deposited to your account!", topNotificationOptions);
        }
        else {
            toast.error("Gift code does not exist!", topNotificationOptions);
        }
    }


    return (
        <div className={`${styles.giftCard} divider-bottom-md`}>
            <h1 className='title-second divider-bottom-xs'>Gift Card</h1>
            <p>Enter GJ35K7 gift code to deposit $500 credit.</p>
            <div className={styles.inputContainer}>
                <i className='fas fa-gift'></i>
                <input onChange={handleCodeInput} value={codeInput} type="text" />
                <button onClick={handleSubmitClick}>Submit</button>
            </div>
        </div>
    );
}
 
export default GiftCard;