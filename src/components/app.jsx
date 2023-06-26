import React from 'react';
import Map from './map';
import { useState,useEffect } from 'react';
import Carddisplay from './carddisplay';


const URL = 'http://localhost:3000/fuel_stations';

export default function App() {

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setStations(data));
  }, []);

  return (
    <>
      <Map stations={stations}/>
      
    </>
  );
}