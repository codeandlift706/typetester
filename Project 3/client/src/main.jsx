
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App';
import Error from './pages/Error';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Score from './pages/Score';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'profile/:username',
                element: <Profile />
            },
            {
                path: '/score',
                element: <Score/>
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
            path: '/me',
            element: <Profile />
            },
            {
                path: '/signup',
                element: <SignupForm />
            }
        ]
    }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);

