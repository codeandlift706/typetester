import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { UPDATE_USER, REMOVE_USER } from '../utils/mutations';
import { Link } from "react-router-dom";

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, { //query for specific username & yourself
    variables: { username: userParam },
  });

  const [userFormState, setUserFormState] = useState({ username: '' })
  const [formState, setFormState] = useState({ email: '', password: '' })

  const [showUsernameUpdateForm, setShowUsernameUpdateForm] = useState(false); //show "User Settings" button

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const [removeUser, { error2 }] = useMutation(REMOVE_USER);

  const user = data?.me || {}; //check if data has user property
  // console.log(user); //shows the user's info as an object
  // console.log(user.username); //shows the current username



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



  const handleRemoveUserFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
const { data} = await removeUser({
        variables: {
          ...formState
        },
      });

      
    } catch (err) {
      console.error(err);
    }
    
    Auth.logout();

    return <Navigate to="/" />;
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value,
    });

    return <Navigate to="/" />;
    };


  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Go back to <Link to="/">Home</Link> to
        sign up or log in!
      </h4>
    );
  }


  return (
    <div>
      <div>
        <div className="user-settings-container">
          <li>
            welcome to {userParam ? `${user.username}'s` : 'your'} profile!
          </li>
          <li class="bottom-space">
            logged in as: {user.username}
          </li>

          {showUsernameUpdateForm && (
            <>
              <form onSubmit={handleUpdateUserFormSubmit}>
                <div>
                  <li><b>update your username</b></li>
                  <li class="mx-1"
                    htmlFor="username">username</li>
                  <div>
                    <input
                      name="username"
                      type="username"
                      id="username"
                      onChange={handleUsernameChange}
                    />
                  </div>
                </div>
                <div>
                  <button class="submit-button" type="submit">update</button>
                </div>

              </form>
              <div class="bottom-space" />
              <li><b>delete your account</b></li>
              <form onSubmit={handleRemoveUserFormSubmit}>
                <div>

                <li class="mx-1"
                    htmlFor="username">email</li>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <button class="submit-button" type="submit">delete</button>
                </div>

              </form>




            </>
          )}

          <button class="submit-button" onClick={() => setShowUsernameUpdateForm(!showUsernameUpdateForm)}>
            {showUsernameUpdateForm ? 'close user settings' : 'user settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;