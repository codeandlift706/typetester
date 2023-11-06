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
    // const user = data?.user || {}; //check if there's a data object and user property, if not, create an empty array

    // console.log(data.data.scores[0].score);
    // const handleRemoveScore = async (scoreId) => {

    //     try {
    //         await removeScore({
    //             variables: { scoreId },
    //         });

    //         // upon success, remove score id from localStorage???
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // if (!scores.length) { //if there are no scores
    //     return <h3>No Scores Yet</h3>;
    // }

    for (let i = 0; i < scores.length; i++) {
        const score = scores[i].score;
        const username = scores[i].user.username;
        // console.log(`Score: ${score}, Username: ${username}`);
    }

    if (loading) {
        return <h3>LOADING...</h3>;
    }

    const scoreItems = scores.map((scoreObject) => {
        const score = scoreObject.score;
        const username = scoreObject.user.username;
        return (
            <tr>
                <td>{username}</td>
                <td>{score}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>{scoreItems}</tbody>
        </table>
    );
};


export default Scoreboard;