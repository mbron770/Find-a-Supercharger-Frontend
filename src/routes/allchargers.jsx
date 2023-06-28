import Carddisplay from "../components/carddisplay";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000/fuel_stations";

export default function AllChargers() {
  const [stations, setStations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setStations(data));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setLocationLoaded(true);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <Carddisplay
        stations={stations}
        currentLocation={currentLocation}
        isLocationLoaded={isLocationLoaded}
        setStations={setStations}
      />
    </>
  );
}
