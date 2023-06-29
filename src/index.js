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

const URL = 'https://find-a-supercharger-backend.onrender.com/fuel_stations'

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
        element: <Reviews />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript 
    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}

    //googleMapsApiKey="PASTE YOUR GOOGLE API KEY HERE"
    libraries={['maps', 'places']}
    >
      <RouterProvider router={router} />
    </LoadScript>
  </React.StrictMode>
);

reportWebVitals();
