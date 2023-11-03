import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { DELETE_USER } from '../utils/mutations';
import { UPDATE_USER } from '../utils/mutations';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, { //query for specific user
    variables: { username: userParam },
  });

  const [userFormState, setUserFormState] = useState({ username: '' })

  const [updateUser, { error }] = useMutation(UPDATE_USER); //I can't have both?
  // const [deleteUser, { error }] = useMutation(DELETE_USER); //Create a custom hook for this?? create a new function where it equals this whole thing

  const user = data?.me || data?.user || {}; //check if data has user property
  console.log(user) //shows the user's info!


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

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2>
      Viewing {userParam ? `${user.username}'s` : 'your'} profile.
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
          <button type="submit">Update</button>
        </div>
      </form>

      {/* Your scores */}
      <h2>
        {user.scores?.length > 0 && <Scoreboard scores={user.scores} />}
      </h2>

      {/* Button to remove user */}
      {/* <Button onClick={() => handleDeleteUser(user.userId)}>
        Delete Your Profile
      </Button> */}

    </div>
  );
};

export default Profile;