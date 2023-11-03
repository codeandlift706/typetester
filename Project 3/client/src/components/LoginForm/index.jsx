import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginForm(props) { //do we need props?
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);


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
            const { data } = await login({
                variables: {...formState},
            });
            const token = data.login.token;
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


        setUserFormData({ //reset the fields
            email: '',
            password: '',
        });
    };

    return (
        <div>
            {/* <Link to="/signup">← Go to Signup</Link> */}
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="email">Email address:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p>The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
