
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App';
import Error from './pages/Error';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Score from './pages/Score';

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
                path: 'profile/:id',
                element: <Profile />
            },
            {
                path: 'score',
                element: <Score/>
            }
        ]
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  );

