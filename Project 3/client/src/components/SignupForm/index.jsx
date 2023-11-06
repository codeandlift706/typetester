import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations'

function SignupForm(props) { //do we need props?
    const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
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


    return (
        <div className="login-container">
            {/* <Link to="/login">← Go to Login</Link> */}

            <p className="title">signup</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label class="login-labels" htmlFor="firstName"><b>first name</b></label>
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
                    <label class="login-labels" htmlFor="lastName"><b>last name</b></label>
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
                    <label class="login-labels" htmlFor="username"><b>username</b></label>
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
                    <label class="login-labels" htmlFor="email"><b>email</b></label>
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
                    <label class="login-labels" htmlFor="pwd"><b>password</b></label>
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
                    <button className="submit-button" type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}


export default SignupForm;

