import React, { useState, useEffect } from 'react'
import TestArea from '../TestArea/TestArea';

function TypingGame() {
    const prompts = ["hello world 1", "hello world 2", "hello world 3", "hello world 4", "hello world 5"]; // replace with API call to get prompts from database

    const [typingText, setTypingText] = useState('');
    const [userInput, setUserInput] = useState('');

    const loadPrompt = () => {
        const randomPrompt = Math.floor(Math.random() * prompts.length);
        const content = [...prompts[randomPrompt]];
        setTypingText(content.join('')); // join the array of characters into a string
    }

const handleInputChange = (event) => {
    const userInput = event.target.value;
    let isMatch = true;

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== typingText[i]) {
            isMatch = false;
            break;
        }
    }

    if (isMatch) {
        console.log('Match!');
    } else {
        console.log('Wrong');
    }

    setUserInput(userInput);
}

    useEffect(() => {
        loadPrompt();
    }, []);

    const typedText = typingText.substring(0, userInput.length);
    const remainingText = typingText.substring(userInput.length);

    return (
        <div className="container">
            <span>{typedText}</span>
            <input
                type="text"
                className="input-field"
                value={userInput}
                onChange={handleInputChange} // call handleInputChange when the input field changes
            />
            <span>{remainingText}</span>
            <TestArea
                typingText={typingText}
            />
        </div>
    );
};
export default TypingGame;