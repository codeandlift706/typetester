//scoreboard - displays list of: usernames & corresponding scores
//QUERY_SCORES, DELETE SCORE
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_SCORES, QUERY_USERS } from '../../utils/queries';
import { DELETE_SCORE } from '../../utils/mutations';


//we need to pass in the user & the score ??????
const Scoreboard = ({ user, scores }) => {

    // const { loading, data } = useQuery(QUERY_SCORES);
    // , { 
    //     variables: { userId, score id?? }, //check ?? Not sure if need to pass in
    //   });

    const { loading, data } = useQuery(QUERY_USERS);

    const [deleteScore, { error }] = useMutation(DELETE_SCORE);

    const scores = data?.scores || {}; //check if there's a data object and score property

    const handleDeleteScore = async () => {

        try {
            const { data } = await deleteScore({
                variables: { userId, scoreId } //remove score!!!! ????
            })


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
                scores.map((score) => ( //map over each score, create a key so that react can identify that item being mapped over. Display each score
                    <div key={score}>
                        <div>
                            <h4>
                                {user.username}..........{score} <br />
                            </h4>
                        </div>
                    </div>
                ))}
        </div>



    );
};

export default Scoreboard;