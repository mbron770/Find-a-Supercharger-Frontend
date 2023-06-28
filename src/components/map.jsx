import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindowF } from "@react-google-maps/api";


const URL = 'http://localhost:3000/fuel_stations';

function Map({stations}) {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (selectedStation && currentLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const request = {
        origin: currentLocation,
        destination: {
          lat: selectedStation.latitude,
          lng: selectedStation.longitude,
        },
        travelMode: "DRIVING",
        drivingOptions: {
          departureTime: new Date(),
        },
      };
      directionsService.route(request, handleDirectionsResponse);
    }
  }, [selectedStation, currentLocation]);

  function handleSelectedStation(station) {
    setSelectedStation(station);
  }

  function handleCloseInfoWindow() {
    setSelectedStation(null);
  }

  function handleDirectionsResponse(response, status) {
    if (status === "OK") {
      const leg = response.routes[0].legs[0];
      setDistance(leg.distance.text);
      setDuration(leg.duration.text);
    } else {
      console.error("Directions request failed:", status);
      setDistance(null);
      setDuration(null);
    }
  }

  function handleGetDirections() {
    if (currentLocation && selectedStation) {
      const origin = `${currentLocation.lat},${currentLocation.lng}`;
      const destination = `${selectedStation.latitude},${selectedStation.longitude}`;
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      window.open(directionsUrl, "_blank");
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={13}
    >
      {currentLocation && (
        <Marker
          position={currentLocation}
          title="Current Location"
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}
      {stations.map(station => (
        <Marker
          key={station.id}
          position={{ lat: station.latitude, lng: station.longitude }}
          title={station.station_name}
          onClick={() => handleSelectedStation(station)}
        />
      ))}
      {selectedStation && (
        <InfoWindowF
          position={{
            lat: selectedStation.latitude,
            lng: selectedStation.longitude,
          }}
          onCloseClick={handleCloseInfoWindow}
          visible={selectedStation !== null}
        >
          <div>
            <h3>City: {selectedStation.city}</h3>
            <p>Station Name: {selectedStation.station_name.split(" - Tesla Supercharger")}</p>
            <p>Address: {selectedStation.street_address}</p>
            <p>Phone: {selectedStation.station_phone}</p>
            {distance && duration && (
              <p>
                Distance: {distance} | Duration: {duration}
              </p>
            )}
            <button onClick={handleGetDirections}>Get Directions</button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default Map;
