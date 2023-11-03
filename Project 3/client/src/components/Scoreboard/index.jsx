//scoreboard - displays list of: usernames & corresponding scores

//we need to pass in the user & the score
const Scoreboard = ({ user, scores }) => {
    if (!scores.length) { //if there are no scores
        return <h3>No Scores Yet</h3>;
    }

    return ( //otherwise, return:
        <div>
            <div>
                {scores &&
                    scores.map((score) => ( //map over each score, create a key so that react can identify that item being mapped over
                        <div key={score}>
                            <div>
                                <h4>
                                    {user.username}..........{score} <br />
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Scoreboard;