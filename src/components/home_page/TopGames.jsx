import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from "../../styles/page_styles/home_page_styles/TopGames.module.scss";

// Images
import logoImage from "../../images/vegas-logo-img.png";


const TopGames = () => {

    const [isHover, setIsHover] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const topGames = [
        {
            gameName: "Roulette",
            urlName: "/roulette-page",
            gameIcon: "fas fa-compact-disc",
            hoverColor: "#273546"
        },
        {
            gameName: "Slot",
            urlName: "/slot-page",
            gameIcon: "fas fa-check-to-slot",
            hoverColor: "#273546"
        },
        {
            gameName: "Crash",
            urlName: "/crash-page",
            gameIcon: "fas fa-chart-line",
            hoverColor: "#273546"
        },
        {
            gameName: "Dice",
            urlName: "/dice-page",
            gameIcon: "fas fa-dice",
            hoverColor: "#273546"
        },
    ];

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        setIsHover(true);
    }

    const handleMouseOut = () => {
        setIsHover(false);
    }


    return (
        <div className={`${styles.topGames} divider-bottom-md`}>
            <h1 className='title-second divider-bottom-xs'>Top Games</h1>
            <div className={styles.topGamesContainer}>
                {topGames.map((game, index) => (
                    <Link
                        to={game.urlName} 
                        key={index} 
                        className={styles.gameCard} 
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={handleMouseOut} 
                        style={{ backgroundColor: isHover ? (hoveredIndex === index ? game.hoverColor : "#1B2329" ) : "#1B2329" }}
                    >
                        <h2><img src={logoImage} alt="vegas-logo-image" />{game.gameName}</h2>
                        <i className={game.gameIcon}></i>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default TopGames;