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
  const [showUsernameUpdateForm, setShowUsernameUpdateForm] = useState(false); //show "User Settings" button


  const [updateUser, { error }] = useMutation(UPDATE_USER);
  // const [removeUser, { error }] = useMutation(REMOCE_USER); //Create a custom hook for this?? create a new function where it equals this whole thing. Maybe don't need removeUser

  const user = data?.me || {}; //check if data has user property
  // console.log(user); //shows the user's info as an object
  // console.log(user.username); //shows the current username
  const canUpdateUsername = userParam === user.id; //shows on profile page if you can update username


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

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updateUser({
        variables: {
          ...userFormState //pass in updated username
        },
      });
      console.log(data); //shows the user with updated username

      if (data) {
        // Username update was successful, display an alert
        alert('Username updated successfully!');
      } else {
        alert('Username update failed. Please try again.');
      }

      return data;

      // Variable to hold our updated user object
      // const updatedUser = {
      //   ...data
      //   // ...user, //user object with all info (email, firstName, lastName, username, scores)
      //   // ...userFormState, //new username to overwrite previous username
      // };

      // if (updatedUser) {
      //   // Username update was successful, display an alert
      //   alert('Username updated successfully!');
      // } else {
      //   alert('Username update failed. Please try again.');
      // }

      // console.log(updatedUser);
      // console.log(userFormState); //returns updated username
      // return {
      //   user: updatedUser, //return the updated user
      // };

    } catch (err) {
      console.error(err)
    }

    setUserFormState({
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
        <p>
          Logged in as: {user.username}
        </p>

        <div className="user-settings-container">
          <h2>
            Welcome to {userParam ? `${user.username}'s` : 'your'} profile!
          </h2>

          {showUsernameUpdateForm && (
            <>
              <h3>Update Your Username</h3>
              <form onSubmit={handleUpdateUserFormSubmit}>
                <div>

                  <label
                    htmlFor="username">Username:</label>
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

          <button onClick={() => setShowUsernameUpdateForm(!showUsernameUpdateForm)}>
            {showUsernameUpdateForm ? 'Close User Settings' : 'User Settings'}
          </button>

          <h2>
            {user.scores?.length > 0 && <Scoreboard scores={user.scores} />}
          </h2>

          {/* Button to remove user */}
          {/* <Button onClick={() => handleRemoveUser(user.userId)}>
          Remove Your Profile
        </Button> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;