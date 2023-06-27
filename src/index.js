import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { LoadScript } from '@react-google-maps/api';
import Error from './error';
import Root from './routes/root';
import App from './components/app';
import AllChargers from './routes/allchargers';
import Reviews from './routes/reviews';
import { useState, useEffect } from 'react';

const URL = 'http://localhost:3000/fuel_stations';

// const [stations, setStations] = useState([]);

// useEffect(() => {
//   fetch(URL)
//     .then(response => response.json())
//     .then(data => setStations(data));
// }, []);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'allchargers',
        element: <AllChargers />,
      },
      {
        path: 'reviews',
        element: <Reviews />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey="AIzaSyDn7oQa4QsdEXc9GoIv5as8gMS8_uF73_4">
      <RouterProvider router={router} />
    </LoadScript>
  </React.StrictMode>
);

reportWebVitals();

