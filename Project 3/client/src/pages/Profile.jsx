import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
// import { REMOVE_USER } from '../utils/mutations';
import { UPDATE_USER } from '../utils/mutations';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, { //query for specific username & yourself
    variables: { username: userParam },
  });

  const [userFormState, setUserFormState] = useState({ username: '' })

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  // const [removeUser, { error }] = useMutation(REMOCE_USER); //Create a custom hook for this?? create a new function where it equals this whole thing. Maybe don't need removeUser

  const user = data?.me || {}; //check if data has user property
  console.log(user); //shows the user's info as an object
  console.log(user.username); //shows the current username
  
  const canUpdateUsername = userParam === user.id;
  // const handleRemoveUser = async (userId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null; //check if we have these

  //   if (!token) {
  //     return false
  //   }

  //   try {
  //     const { data } = await removeUser({
  //       variables: { userId } //remove user by its id. userId = userId
  //     })

  //     //upon success, remove user ID and associated scores from localstorage ? -- redirect the user to the home page
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

//collect user input
  const handleUsernameChange = (event) => {
    const { name, value } = event.target;
    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

//submit form
  const handleUpdateUserFormSubmit = async (event) => {
    event.preventDefault();

    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await updateUser({
        variables: {
          ...userFormState
        },
      });
console.log(userFormState); //IT SHOWS THE TYPED IN NEW USERNAME IN THE CONSOLE LOG
      // const token = data.addUser.token;
      // Auth.login(token); //verify this
      //upon success, update username based on userId -- in local storage?

    } catch (err) {
      console.error(err)
    }

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
    <>
      <NavBar />
      <div>
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {canUpdateUsername && (
          <>
            <h3>Update Your Username</h3>

            <form onSubmit={handleUpdateUserFormSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  placeholder="username"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </>
        )}

        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} scores:
        </h2>

        <h2>
          {user.scores?.length > 0 && <Scoreboard scores={user.scores} />}
        </h2>


        {/* Button to remove user */}
        {/* <Button onClick={() => handleRemoveUser(user.userId)}>
        Remove Your Profile
      </Button> */}
      </div>
      <Footer />
    </>
  );
};

export default Profile;