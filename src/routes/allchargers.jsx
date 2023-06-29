import Carddisplay from "../components/carddisplay"
import { useEffect,useState } from "react";



const URL = 'https://find-a-supercharger-backend.onrender.com/fuel_stations'

export default function AllChargers() {
    const [stations, setStations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLocationLoaded, setLocationLoaded] = useState(false);
    const [searchLocation, setsearchLocation] = useState('')
    const [testLocation, setTestLocation] = useState({})

    useEffect(() => {
        fetch(URL)
          .then(response => response.json())
          .then(data => setStations(data));
      }, []);
    
      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
              setLocationLoaded(true);
              setTestLocation(currentLocation)
            },
            (error) => {
              console.error("Error getting current location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }, []); 


     // const allStations = stations.filter(station => station.station_name.toLowerCase().includes(searchLocation.toLowerCase()))



    return (
        <>
       
            <Carddisplay 
            
            stations={stations.filter(station => station.street_address.toLowerCase().includes(searchLocation.toLowerCase()))} 
            currentLocation={currentLocation} 
            isLocationLoaded={isLocationLoaded} 
            setStations={setStations}
            searchLocation = {searchLocation}
            setsearchLocation = {setsearchLocation}
            testLocation = {testLocation}
            setTestLocation = {setTestLocation}
            
            
            />
        </>
    )
}


