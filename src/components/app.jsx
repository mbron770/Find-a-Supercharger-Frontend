import React from 'react';
import Map from './map';
import { useState,useEffect } from 'react';

const URL = 'http://localhost:3000/fuel_stations';

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