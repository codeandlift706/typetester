import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations'

function SignupForm(props) { //do we need props?
    const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [addUser, { error }] = useMutation(ADD_USER);

    // useEffect(() => {
    //     if (error) {
    //         setShowAlert(true);
    //     } else {
    //         setShowAlert(false);
    //     }
    // }, [error])


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!isValidPassword(formState.password)) {
            setErrorMessage('Invalid Password.'); // error message
            console.log('Error message:', errorMessage); // Add this line
            return;
          }
          setErrorMessage('');

        try {
            const { data } = await addUser({
                variables: { ...formState},
            });
            const token = data.addUser.token;
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        // setFormState({ //reset the fields
        //     firstName: '',
        //     lastName: '',
        //     username: '',
        //     email: '',
        //     password: '',
        // });
    };


    const isValidPassword = (password) => {
        return password.length >= 8;
      };

    return (
        <div className="login-container">
            {/* <Link to="/login">← Go to Login</Link> */}

            <p className="title">signup</p>
            <form onSubmit={handleFormSubmit}>
                                {/* Display error message for password */}
      {errorMessage && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <div>
                    <input
                        placeholder="first"
                        name="firstName"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <div>
                    <input
                        placeholder="last"
                        name="lastName"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <div>
                    <input
                        placeholder="username"
                        name="username"
                        type="username"
                        id="username"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <div>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="pwd">Password</label>
                    <div>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <button className="begin-button" type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}


export default SignupForm;

