import React, { useState, useEffect, useRef, useContext } from 'react';
import './TypingGame.css';
import { useQuery } from '@apollo/client';
import { QUERY_PROMPTS } from '../../utils/queries';
import { LoadingContext } from '../TypingGame/LoadingContext';

function TypingGame() {
    const { loading } = useContext(LoadingContext);
    const { data } = useQuery(QUERY_PROMPTS);
    const prompts = data?.prompts?.map(prompt => prompt.text) || [];

    const [typingText, setTypingText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const inputRef = useRef(null);

    const loadPrompt = () => {
        const randomPrompt = Math.floor(Math.random() * prompts.length);
        const content = [...prompts[randomPrompt]];
        setTypingText(content.join('')); // join the array of characters into a string
    }

    const handleInputChange = (event) => {
        const input = event.target.value;
        setUserInput(input);
    
        if (startTime === null) {
            setStartTime(Date.now());
        }
    
        if (input === typingText) {
            setEndTime(Date.now());
        }
    
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

    const handleReset = () => {
        setTypingText('');
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setElapsedTime(0);
        loadPrompt();
        inputRef.current.focus();
    }

    useEffect(() => {
        if (data) {
            loadPrompt();
            inputRef.current.focus();
        }
    }, [data]);

    useEffect(() => {
        if (endTime !== null) {
            const elapsedTime = (endTime - startTime) / 1000; // convert to seconds
            const words = typingText.split(' ').length;
            const wpm = Math.round(words / (elapsedTime / 60));
            setWpm(wpm);
        }
    }, [endTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime !== null && endTime === null) {
                const elapsed = Math.round((Date.now() - startTime) / 1000);
                setElapsedTime(elapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    const typedText = typingText.split('').map((char, index) => {
        let className = '';

        if (index < userInput.length) {
            className = char === userInput[index] ? 'correct' : 'incorrect';
        }

        return <span key={index} className={className}>{char}</span>;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <div className="typing-text hidden-div">{typedText}</div>
            <textarea
                type="text"
                className="input-field hidden-div"
                value={userInput}
                onChange={handleInputChange} // call handleInputChange when the input field changes
                ref={inputRef}
            />
            {endTime !== null && (
                <div className="stats">
                    <div className="stat">
                        Time: {elapsedTime} s
                    </div>
                    <div className="stat">
                        WPM: {wpm}
                    </div>
                </div>
            )}
            <button class="reset-button hidden-div" onClick={handleReset}>reset</button>
        </div>
    );
}

export default TypingGame;