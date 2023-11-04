//scoreboard - displays list of: usernames & corresponding scores, button next to each score to remove if it is your own score
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SCORES, QUERY_USERS } from '../../utils/queries';
import { REMOVE_SCORE } from '../../utils/mutations';


const Scoreboard = () => {

    const { loading, data } = useQuery(QUERY_SCORES);

    // const { loading, data } = useQuery(QUERY_USERS);

    const [removeScore, { error }] = useMutation(REMOVE_SCORE);

    const scores = data?.scores || []; //check if there's a data object and score property, if not, create an empty array
    const user = data?.user || {};

    const handleRemoveScore = async (scoreId) => {

        try {
            await removeScore({
                variables: { scoreId },
            });

            // upon success, remove score id from localStorage???
        } catch (err) {
            console.error(err);
        }
    };

    if (!scores.length) { //if there are no scores
        return <h3>No Scores Yet</h3>;
    }

    if (loading) {
        return <h3>LOADING...</h3>;
    }

    return ( //otherwise, return:
        <div>
            {scores &&
                scores.map((score) => ( //map over each score, create a key so that react can identify that item being mapped over
                    <div key={score.id}>
                        <div>
                            <h4>
                                {user.username} .......... {score.score}
                                {user.id === score.userId && ( //if the score's userid matches yours, the user's, display remove score button
                                    <button onClick={() => handleRemoveScore(score.id)}>
                                        Remove
                                    </button>
                                )}
                            </h4>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Scoreboard;