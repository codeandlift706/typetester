import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
//import { QUERY_ME } from '../utils/queries';
import { QUERY_USER } from '../../utils/queries';
import { DELETE_USER } from '../../utils/mutations';
import { UPDATE_USER } from '../../utils/mutations';

const Profile = () => {

  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_USER, { //query for specific user
    variables: { userId },
  });

  const [userFormState, setUserFormState] = useState({ username: '' })

  const [updateUser, { error }] = useMutation(UPDATE_USER); //I can't have both?
  // const [deleteUser, { error }] = useMutation(DELETE_USER); //Create a custom hook for this?? create a new function where it equals this whole thing

  const userData = data?.user || {}; //check if data has user property


  // const handleDeleteUser = async (userId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null; //check if we have these

  //   if (!token) {
  //     return false
  //   }

  //   try {
  //     const { data } = await deleteUser({
  //       variables: { userId } //remove user by its id. userId = userId
  //     })

  //     //upon success, remove user ID and associated scores from localstorage ? -- redirect the user to the home page
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updateUser({
        variables: {
          username: userFormState.username,
        }
      })

      const token = data.addUser.token;
      Auth.login(token); //verify this
      //upon success, update username based on userId -- in local storage?

    } catch (err) {
      console.error(err)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormState({
      ...userFormState,
      [name]: value,
    });

    setUserFormState({ //reset the fields
      username: '',
    });
  };



  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>
        Your profile. Logged in as ({userData.username})
      </h2>

      {/* Update your username */}
      <h2>Update Your Username</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Your scores */}
      <h2>
        {userData.scores?.length > 0 && <Scoreboard scores={userData.scores} />}
      </h2>

      {/* Button to remove user */}
      {/* <Button onClick={() => handleDeleteUser(user.userId)}>
        Delete Your Profile
      </Button> */}

    </div>
  );
};

export default Profile;