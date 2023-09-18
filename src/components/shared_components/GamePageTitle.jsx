import React from 'react';

// Components
import GameOptions from './GameOptions';


const GamePageTitle = ({ gameName, gameInfoData }) => {
    return (
        <div className={`flex-space-between divider-bottom-xs`}>
            <h1 className='title-main'>{gameName}</h1>
            <GameOptions gameType={gameInfoData} />
        </div>
    );
}
 
export default GamePageTitle;