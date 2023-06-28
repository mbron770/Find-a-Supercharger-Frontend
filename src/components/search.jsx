import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Form from "react-bootstrap/Form";

export default function Search({
  currentLocation,
  setLat,
  setLng,
  address,
  setAddress,
}) {
  useEffect(() => {
    if (currentLocation) {
      setLat(currentLocation.lat);
      setLng(currentLocation.lng);
    }
  }, [currentLocation]);

  const handleAddressSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

    try {
      const results = await geocodeByAddress(selectedAddress);
      const selectedLocation = await getLatLng(results[0]);
      const { lat, lng } = selectedLocation;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setLat(lat);
      setLng(lng);
      const addressArr = selectedAddress.split(", ");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  function handleAddressChange(selectedAddress) {
    //console.log(address,"   parent")
    if (address.length === 1) {
      //console.log ("DONE")
      setLat(currentLocation.lat);
      setLng(currentLocation.lng);
    }
    setAddress((prevAddr) => selectedAddress);
  }

  return (
    <>
      <div>
        <br></br>
        <Form.Group
          controlId="addressCityStateZip"
          style={{
            width: "60vh",
            position: "fixed",

            top: "9.75%",
            left: "35%",
            zIndex: "9999",
            borderRadius: "25px",
          }}
        >
          <div>
            <PlacesAutocomplete
              value={address}
              onChange={handleAddressChange}
              onSelect={handleAddressSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Form.Control
                    {...getInputProps({
                      placeholder: "Find a Charging Station...",
                      size: "md",
                    })}
                    style={{
                      width: "60vh",
                      position: "fixed",
                      bottom: "91%",
                      left: "35%",

                      backgroundColor: "rgba(211, 211, 211, 0.8)",
                      zIndex: "9999",
                      borderRadius: "25px",
                    }}
                  />
                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#e2e2e2" : "#fff",
                      };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          key={suggestion.placeId}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </Form.Group>
      </div>
    </>
  );
}
