import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", 
                            "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", 
                            "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

function Newstation() {
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pricing, setPricing] = useState("");
  const [review, setReview] = useState([]);
  const [chargerType, setChargerType] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [accessDaysTime, setAccessDayTime] = useState("");
  const [zip, setZip] = useState("");

  function handleAddressChange(selectedAddress) {
    setAddress(selectedAddress);
  }

  const handleAddressSelect = async (selectedAddress) => {
    setAddress(selectedAddress);

    try {
      const results = await geocodeByAddress(selectedAddress);
      const selectedLocation = await getLatLng(results[0]);
      const { lat, lng } = selectedLocation;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      //console.log (selectedAddress)
      setLat(lat);
      setLng(lng);
      const addressArr = selectedAddress.split(", ");
      // console.log (addressArr[addressArr.length-2])
      // console.log (addressArr[addressArr.length-3])
      setCity(addressArr[addressArr.length - 3]);
      setState(addressArr[addressArr.length - 2]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    const newStation = {
      access_days_time: accessDaysTime,
      station_name: stationName,
      station_phone: "877-798-3752",
      latitude: lat,
      longitude: lng,
      city: city,
      state: state,
      street_address: address.split(",")[0],
      country: "US",
      zip: zip,
      comments: review,
      ev_pricing: pricing,
    };
    if (
      city !== "" &&
      state !== "" &&
      address !== "" &&
      pricing !== "" &&
      stationName !== ""
    ) {
      fetch("http://localhost:3000/fuel_stations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newStation),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(newStation);
          setStationName("");
          setAddress("");
          setCity("");
          setState("");
          setPricing("");
          setReview("");
          setChargerType("");
          setAccessDayTime("");
          setZip("");
        });
    } else {
      alert("Please complete the form");
    }
  }

  return (
    <div
      className="tcl-video-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <video
        className="tcl-asset tcl-video__asset lozad tcl-objectfit-position tcl-objectfit-position--center visible-no-fade-in"
        preload="auto"
        playsInline
        data-autoplay-desktop={true}
        data-autoplay-portrait={true}
        data-autoplay-mobile={true}
        data-play-on-hover={false}
        muted
        loop
        controls={false}
        data-src-desktop="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Supercharger-Main-Hero-Desktop-NA.mp4"
        data-src-portrait="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Supercharger-Main-Hero-Desktop-NA.mp4"
        data-src-mobile="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Supercharger-Main-Hero-Mobile-NA.mp4"
        data-src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Supercharger-Main-Hero-Desktop-NA.mp4"
        data-object-fit={true}
        src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Supercharger-Main-Hero-Desktop-NA.mp4"
        data-loaded={true}
        autoPlay={true}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></video>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 24,
        }}
      >
        Add a Charging Station
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",

          position: "absolute",
          top: "95%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 20,
        }}
      >
        15 min
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "98%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 12,
        }}
      >
        for a 200 mile charge
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "95%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 20,
        }}
      >
        1800+
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "98%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 12,
        }}
      >
        US Charging Stations
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "95%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 20,
        }}
      >
        $
      </h1>
      <h1
        className="tcl-hero__heading tds-colorscheme--dark tds-animate_small--to_reveal"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "98%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 12,
        }}
      >
        less than gasoline
      </h1>

      <div
        className="tcl-form-overlay"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "20px",
          borderRadius: "10px",

          marginTop: "1.75%",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="stationName">
            <Form.Label>Station Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              style={{ width: "100%" }}
              required={!!stationName.length}
              isInvalid={
                stationName.length > 0 &&
                !isNaN(parseFloat(stationName)) &&
                isFinite(stationName)
              }
            />{" "}
            <Form.Control.Feedback type="invalid">
              Please Enter a Valid Name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="addressCityStateZip">
            <Form.Label>Address, City, State</Form.Label>
            <div>
              <div>
                <PlacesAutocomplete
                  value={address}
                  onChange={handleAddressChange}
                  onSelect={handleAddressSelect}
                  required
                  isInvalid
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <Form.Control
                        required={!!suggestions.length}
                        isInvalid={
                          suggestions.length > 0 &&
                          !isNaN(parseFloat(suggestions)) &&
                          isFinite(suggestions)
                        }
                        type="text"
                        {...getInputProps({
                          placeholder: "Address",
                          size: "sm",
                        })}
                        style={{ width: "100%" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter a Valid Address
                      </Form.Control.Feedback>

                      <div>
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "#e2e2e2"
                              : "#fff",
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
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ flex: 1, marginRight: "5px" }}>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%" }}
                    required={!!city.length}
                    isInvalid={
                      city.length > 0 &&
                      !isNaN(parseFloat(city)) &&
                      isFinite(city)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter a Valid City
                  </Form.Control.Feedback>
                </div>
                <div style={{ flex: 1, marginRight: "5px" }}>
                  <Form.Control
                    type="number"
                    size="sm"
                    placeholder="Zip"
                    value={zip}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,5}$/.test(input)) {
                        setZip(input);
                      }
                    }}
                    style={{ width: "100%" }}
                    required
                    isInvalid={
                      zip.length !== 5 &&
                      !isNaN(parseFloat(zip)) &&
                      isFinite(zip)
                    }
                  />{" "}
                  <Form.Control.Feedback type="invalid">
                    Please Enter a 5 Digit Zip
                  </Form.Control.Feedback>
                </div>
                <div style={{ flex: 1, marginLeft: "5px" }}>
                  <Form.Control
                    as="select"
                    size="sm"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: "100%" }}
                    required={!!state.length}
                    isInvalid={
                      state.length > 0 &&
                      !isNaN(parseFloat(state)) &&
                      isFinite(state)
                    }
                  >
                    <option value="">State</option>
                    {stateAbbreviations.map((state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please Enter a Valid Price
                  </Form.Control.Feedback>
                </div>
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="pricing">
            <Form.Label>Pricing</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
              style={{ width: "100%" }}
              required={!!pricing.length}
              isInvalid={
                pricing.length > 0 &&
                !isNaN(parseFloat(pricing)) &&
                isFinite(pricing)
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a Valid Price
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="accessdaytime">
            <Form.Label>Access Hours</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={accessDaysTime}
              onChange={(e) => setAccessDayTime(e.target.value)}
              style={{ width: "100%" }}
              required={!!accessDaysTime.length}
              isInvalid={
                accessDaysTime.length > 0 &&
                !isNaN(parseFloat(accessDaysTime)) &&
                isFinite(accessDaysTime)
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Valid Hours
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="chargerType">
            <Form.Label>Charger Type</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={chargerType}
              onChange={(e) => setChargerType(e.target.value)}
              style={{ width: "100%" }}
              required={!!chargerType.length}
              isInvalid={
                chargerType.length > 0 &&
                !isNaN(parseFloat(chargerType)) &&
                isFinite(chargerType)
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a Type
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="sm"
              value={review}
              onChange={(e) => setReview([e.target.value])}
              style={{ width: "100%" }}
            />
          </Form.Group>
          <br></br>

          <div className="d-grid gap-2">
            <Button variant="danger" size="lg" type="submit">
              Add New Station
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Newstation;