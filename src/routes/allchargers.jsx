import Carddisplay from "../components/carddisplay"
import { useState, useEffect } from "react";

export default function AllChargers() {

const [stations, setStations] = useState([]);
const URL = "http://localhost:3000/fuel_stations";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((stations) => setStations(stations));
  }, []);



    return (
        <>
            <Carddisplay stations = {stations}/>
        </>
    )
}

