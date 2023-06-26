import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function CardDisplay({stations,currentLocation,isLocationLoaded,setStations}) {

  useEffect(() => {
    if (isLocationLoaded && currentLocation) {
      calculateDistances();
    }
  }, [isLocationLoaded, currentLocation]);

  const calculateDistances = () => {
    const yourLatitude = currentLocation.lat;
    const yourLongitude = currentLocation.lng;

    const updatedStations = stations.map(station => {
      const stationLatitude = station.latitude;
      const stationLongitude = station.longitude;

      const distance = calculateDistance(
        yourLatitude,
        yourLongitude,
        stationLatitude,
        stationLongitude
      );
        
      return {
        ...station,
        distance: distance
      };
    });

    updatedStations.sort((a, b) => a.distance - b.distance);
    setStations(updatedStations);
  };

  function calculateDistance (lat1, lon1, lat2, lon2) {
    const R = 3959; // Radius of the Earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      {stations.map(station => (
        <div key={uuidv4()}>
          <p>Station: {station.station_name}</p>
          {station.distance && <p>Distance: {station.distance.toFixed(2)} miles</p>}
        </div>
      ))}
    </div>
  );
};

export default CardDisplay;
