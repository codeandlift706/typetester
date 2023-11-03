import React, { useState, useEffect } from 'react'
import TestArea from '../TestArea/TestArea';
import './TypingGame.css';

function TypingGame() {
    const prompts = [
        'The quick brown fox jumps over the lazy dog',
        'She sells seashells by the seashore',
        'Peter Piper picked a peck of pickled peppers',
        'How much wood would a woodchuck chuck',
        'Sally sells seashells down by the seashore'
    ]; // replace with API call to get prompts from database

    const [typingText, setTypingText] = useState('');
    const [userInput, setUserInput] = useState('');

    const loadPrompt = () => {
        const randomPrompt = Math.floor(Math.random() * prompts.length);
        const content = [...prompts[randomPrompt]];
        setTypingText(content.join('')); // join the array of characters into a string
    }

    const handleInputChange = (event) => {
        const input = event.target.value;
        setUserInput(input);
        let isMatch = true;

        for (let i = 0; i < input.length; i++) {
            if (input[i] !== typingText[i]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            console.log('Match!');
        } else {
            console.log('Wrong');
        }
    }

    useEffect(() => {
        loadPrompt();
    }, []);

    const typedText = typingText.split('').map((char, index) => {
        let className = '';

        if (index < userInput.length) {
            className = char === userInput[index] ? 'correct' : 'incorrect';
        }

        return <span key={index} className={className}>{char}</span>;
    });

    return (
        <div className="container">
            <div className="typing-text">{typedText}</div>
            <input
                type="text"
                className="input-field"
                value={userInput}
                onChange={handleInputChange} // call handleInputChange when the input field changes
            />
            <TestArea
                typingText={typingText}
            />
        </div>
    );
};
export default TypingGame;