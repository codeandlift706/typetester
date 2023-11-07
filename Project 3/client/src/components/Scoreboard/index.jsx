import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SCORES, QUERY_USERS } from '../../utils/queries';
import { REMOVE_SCORE } from '../../utils/mutations';


const Scoreboard = () => {

    const { loading, data } = useQuery(QUERY_SCORES);
    const [removeScore, { error }] = useMutation(REMOVE_SCORE);

    const scores = data?.scores || []; //check if there's a data object and score property, if not, create an empty array

    const handleRemoveScore = async (scoreId) => {

        try {
            await removeScore({
                variables: { scoreId },
            });

        } catch (err) {
            console.error(err);
        }
    };


    if (!scores.length) {
        return <h3>No Scores Yet</h3>;
    }

    if (loading) {
        return <h3>LOADING...</h3>;
    }

    const scoreItems = scores.map((scoreArray) => { //map over each score in the score array
        const score = scoreArray.score; //grab the score from the score array
        const username = scoreArray.user.username; //grab the username from the score array
        return (
            // render each pair as data in a table row
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
                    <th>Score (WPM)</th>
                </tr>
            </thead>
            <tbody>{scoreItems}</tbody>
        </table>
    );
};


export default Scoreboard;