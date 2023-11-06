import React, { useState } from 'react';
import TypingGame from '../TypingGame/TypingGame';

function BeginButton() {
    
    const [TypingGame, setTypingGame] = useState(false);

    const handleButtonClick = () => {
        setTypingGame(true);
    };

    return (
        <div>
            <button class="begin-button" onClick={handleButtonClick}>begin</button>
            {TypingGame && <TypingGame />}
        </div>
    );

}

export default BeginButton;