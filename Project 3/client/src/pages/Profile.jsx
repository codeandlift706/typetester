import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, { //query for specific username & yourself
    variables: { username: userParam },
  });

  const [userFormState, setUserFormState] = useState({ username: '' })
  const [showUsernameUpdateForm, setShowUsernameUpdateForm] = useState(false); //show "User Settings" button

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const user = data?.me || {}; //check if data has user property
  // console.log(user); //shows the user's info as an object
  // console.log(user.username); //shows the current username
  const canUpdateUsername = userParam === user.id; //shows on profile page if you can update username

  
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

    const confirmation = window.confirm('Are you sure you want to update your username?');

    if (!confirmation) {
      return false; // Cancel the form submission
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

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;