import React, { useState } from 'react';
import TypingGame from '../TypingGame/TypingGame';
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";


function BeginButton() {

    const handleButtonClick = (event) => {
    };

    if (Auth.loggedIn()) {
        return (
            <div>
                <Link to="/play">
                    <button class="begin-button" onClick={handleButtonClick}>begin</button>
                </Link>
            </div>
        );
    } else {
        return;
    }
}

export default BeginButton;