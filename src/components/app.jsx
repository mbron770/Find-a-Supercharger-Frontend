import React from 'react';
import Map from './map';
import Newstation from './Newstation';
import { useState,useEffect } from 'react';




const URL = 'https://find-a-supercharger-backend.onrender.com/fuel_stations'

export default function App() {

  const [stations, setStations] = useState([]);
  

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setStations(data));
  }, []);




  return (
    <div className="ui raised segment">
      {/* <Header /> */}
      <Map stations={stations}/>
    
      
    </div>
  );
}
