import React, { useEffect, useState } from 'react';

// Styles
import styles from "../../styles/page_styles/balance_page_styles/BalancePage.module.scss";

// Components
import Loader from '../shared_components/Loader';


const CryptoCurrencies = ({ cryptoTitle }) => {

    const API_URL = import.meta.env.VITE_CRYPTO_API_URL

    const [coinData, setCoinData] = useState([]);
    const coinSymbols = ["BTC", "ETH", "TRX", "BNB", "USDT"];

    const [isCoinLoading, setIsCoinLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const [isHover, setIsHover] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);


    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Error loading data...");
            const coinData = await response.json();
            for(let coin of coinData.data.coins) {
                if(coinSymbols.includes(coin.symbol)) {
                    setCoinData(prev => [...prev, coin]);
                }
            }
        }
        catch(err) {
            setErrorMessage(err.message);
        }
        finally {
            setIsCoinLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    const handleMouseEnter = (coinId) => {
        setHoveredIndex(coinId);
        setIsHover(true);
    }


    const handleMouseOut = () => {
        setIsHover(false);
    }


    return (
        <div className={`${styles.cryptoCurrencies} divider-bottom-md`}>
            <h1 className='title-second divider-bottom-xs'>{cryptoTitle}</h1>
            {isCoinLoading && 
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 0" }}>
                    <Loader />
                </div>
            }

            {!isCoinLoading && errorMessage && 
                <p className={styles.errorMessage}>Reload the page...</p>
            }

            {!isCoinLoading && !errorMessage && 
                <ul>
                    {coinData.map((coin) => (
                        <li 
                            key={coin.uuid}
                            onMouseEnter={() => handleMouseEnter(coin.uuid)}
                            onMouseLeave={handleMouseOut}
                            style={{ boxShadow: isHover ? (coin.uuid == hoveredIndex ? `0px 0px 10px 2px ${coin.color}` : "") : "" }}
                        >
                            <div style={{ borderBottom: `2px solid ${coin.color}` }} className={styles.coinContainerTop}>
                                <img src={coin.iconUrl} alt="coin-symbol-image" />
                            </div>
                            <div className={styles.coinContainerBottom}>
                                <h2>{coin.name}</h2>
                                <p>1 {coin.symbol} = ${Number(coin.price).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}
 
export default CryptoCurrencies;