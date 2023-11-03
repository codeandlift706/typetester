import React, { useState, useEffect } from 'react'
import TestArea from '../TestArea/TestArea';

function TypingGame() {
    const prompts = ["hello world 1", "hello world 2", "hello world 3", "hello world 4", "hello world 5"]; // replace with API call to get prompts from database

    const [typingText, setTypingText] = useState('');

    const loadPrompt = () => {
        const randomPrompt = Math.floor(Math.random() * prompts.length);
        const content = Array.from(prompts[randomPrompt]);
        setTypingText(content);
    }
    useEffect(() => {
        loadPrompt();
    }, []);
    return (
        <div className="container">
            <input
                type="text"
                className="input-field"
            />
            <TestArea
                typingText={typingText}
            />
        </div>
    );
};
export default TypingGame