import React, { useState, useEffect, useRef, useContext } from 'react';
import './TypingGame.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROMPTS } from '../../utils/queries';
import { ADD_SCORE } from '../../utils/mutations';
import { LoadingContext } from './LoadingContext';

function TypingGame() {
    const { loading } = useContext(LoadingContext);
    const { data } = useQuery(QUERY_PROMPTS);
    const prompts = data?.prompts?.map((prompt) => prompt.text) || [];
    const [addScore] = useMutation(ADD_SCORE);
    const [typingText, setTypingText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [accuracy, setAccuracy] = useState(null);
    const [numIncorrect, setNumIncorrect] = useState(0);
    const [cheatingMessage, setCheatingMessage] = useState('');
    const inputRef = useRef(null);

    // Load a random prompt from the database
    const loadPrompt = () => {
        const randomPrompt = Math.floor(Math.random() * prompts.length);
        const content = [...prompts[randomPrompt]];
        setTypingText(content.join('')); // join the array of characters into a string
    };

    // Handle changes to the input field
    const handleInputChange = (event) => {
        const input = event.target.value;
        setUserInput(input);

        // Start the timer if it hasn't started yet
        if (startTime === null) {
            setStartTime(Date.now());
        }

        // Stop the timer if the user has typed the entire prompt
        if (input === typingText) {
            setEndTime(Date.now());
        }

        // Check if the user's input matches the prompt
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

        const value = event.target.value;
        const lastChar = value[value.length - 1];
        const lastPromptChar = typingText[userInput.length];

        if (lastChar === lastPromptChar) {
            setUserInput(value);
        } else {
            setNumIncorrect(numIncorrect + 1);
        }
    };

    // Reset the game
    const handleReset = () => {
        setTypingText('');
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setElapsedTime(0);
        setAccuracy(null);
        setNumIncorrect(0);
        setCheatingMessage('');
        loadPrompt();
        inputRef.current.focus();
    };

    // Load a new prompt when the component mounts or when the data changes
    useEffect(() => {
        if (data) {
            loadPrompt();
            inputRef.current.focus();
        }
    }, [data]);

    // Calculate the WPM and accuracy when the user finishes typing the prompt
    useEffect(() => {
        if (endTime !== null) {
            const elapsedTime = (endTime - startTime) / 1000; // convert to seconds
            const words = typingText.split(' ').length;
            const wpm = Math.round(words / (elapsedTime / 60));

            if (wpm === Infinity) {
                setWpm(0);
                setAccuracy(null);
                setCheatingMessage('No cheating!');
            } else {
                setWpm(wpm);
                const numCorrect = typingText.length - numIncorrect;
                const accuracy = Math.round((numCorrect / typingText.length) * 100);
                setAccuracy(accuracy);

                // Add the score to the database
                const userId = user?._id;

                addScore({
                    variables: { wpm: wpm },
                });
            }
        }
    }, [endTime]);

    // Update the elapsed time every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime !== null && endTime === null) {
                const elapsed = Math.round((Date.now() - startTime) / 1000);
                setElapsedTime(elapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    // Display the prompt with correct/incorrect characters highlighted
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
          {cheatingMessage !== '' ? (
            <p>{cheatingMessage}</p>
          ) : (
            <>
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
                  <div className="stat">
                    Accuracy: {accuracy}%
                  </div>
                </div>
              )}
            </>
          )}
          <button class="reset-button hidden-div" onClick={handleReset}>reset</button>
        </div>
      );
}

export default TypingGame;