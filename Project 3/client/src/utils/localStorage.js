//create function to save to and retrieve scores from local storage, based on score ID ? --- need to confirm with Nathan on game scores
export const getSavedScoreIds = () => {
    const savedScoreIds = localStorage.getItem('saved_scores')
        ? JSON.parse(localStorage.getItem('saved_scores'))
        : [];

    return savedScoreIds;
};


export const saveScoreIds = (scoreIdArr) => {
    if (scoreIdArr.length) {
        localStorage.setItem('saved_scores', JSON.stringify(scoreIdArr));
    } else {
        localStorage.removeItem('saved_scores');
    }
};

//remove scores from local storage, based on score ID