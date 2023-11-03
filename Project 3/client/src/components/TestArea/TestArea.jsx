
function TestArea({ typingText }) {

    return (
        <div className="gameBox">
            <div className="inputArea">
                <p id="prompt">{typingText}</p>
            </div>
            <div className="results">
                <ul className="resultsList">
                    <li className="time">
                        <p>Time</p>
                    </li>
                    <li>
                        <p>WPM</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TestArea;