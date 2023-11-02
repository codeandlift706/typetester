import React, { useState } from 'react';

function TestArea({ testText, onTestStart }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStartClick = () => {
    onTestStart(inputValue);
  };

  return (
    <div>
      <textarea value={inputValue} onChange={handleInputChange} />
      <button onClick={handleStartClick}>Start Test</button>
    </div>
  );
}

export default TestArea;