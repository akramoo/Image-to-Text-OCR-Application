import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home';
import App from './pages/app';
import About from './pages/about';
import Results from './pages/results';

import './styles.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/scan',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/results',
    element: <Results />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
