import React from "react";
import { useState,useEffect } from "react";

const URL = 'http://localhost:3000/fuel_stations';

export default function Carddisplay() {

  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setStations(data));
  }, []);

  console.log (stations)
  
  return (
    <>   
      <h1>card display</h1>
    </>
  );
} 