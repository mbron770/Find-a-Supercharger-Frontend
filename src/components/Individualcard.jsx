import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { GoogleMap, Marker, InfoWindowF } from "@react-google-maps/api";

const URL = "http://localhost:3000/fuel_stations";

export default function Individualcard({
  station,
  stations,
  setStations,
  stationLatitude,
  stationLongitude,
  lat, 
  lng,
}) {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
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
          lat: stationLatitude,
          lng: stationLongitude,
        },
        travelMode: "DRIVING",
        drivingOptions: {
          departureTime: new Date(),
        },
      };
      directionsService.route(request, handleDirectionsResponse);
    }
  }, [selectedStation, currentLocation]);

  // const i = [stationLatitude, stationLongitude];
  // console.log(i);

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

  function handleGetDirections(stationLatitude, stationLongitude) {
    const origin = `${lat},${lng}`;
      const destination = `${stationLatitude},${stationLongitude}`;
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      window.open(directionsUrl, "_blank");
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function handleAddReview() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setComment("");
    setShowModal(false);
  }

  function handleAddComment(e) {
    e.preventDefault();
    const updatedComments = station.comments
      ? [...station.comments, comment]
      : [comment];
    const updatedStation = {
      ...station,
      comments: updatedComments,
    };

    fetch(`${URL}/${station.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ comments: updatedComments }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Find the index of the updated station in the stations array
        const updatedIndex = stations.findIndex((s) => s.id === station.id);

        // Create a new stations array with the updated station
        const updatedStations = [
          ...stations.slice(0, updatedIndex),
          updatedStation,
          ...stations.slice(updatedIndex + 1),
        ];

        // Update the stations state with the updatedStations array
        setStations(updatedStations);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    setShowModal(false);
    setComment("");
  }
  const containerStyle = {
    width: "100%",
    height: "25vh",
  };

  const desitantionMarkers = {
    lat: stationLatitude,
    lng: stationLongitude,
  };

  // console.log(desitantionMarkers);

  return (
    <>
      <Card bg="white" style={{ flex: "1"}}>
        <Card.Header
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontFamily: "Helvetica Neue",
            fontStyle: "normal",
            backgroundColor: "black",
            color: "white",
          }}
        >
          {" "}
          {station.station_name.split(" - Tesla Supercharger")}
        </Card.Header>

        <Card.Body>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={desitantionMarkers}
            zoom={15}
          >
            {currentLocation && (
              <Marker
                position={desitantionMarkers}
                title="Station"
                onClick={(e) =>
                  handleGetDirections(stationLatitude, stationLongitude)
                }
              />
            )}
          </GoogleMap>
          {"\u00A0"}
          <Card.Title>{`${station.street_address}`}</Card.Title>
          <Card.Title>{`${station.city}, ${station.state} ${station.zip}`}</Card.Title>
          
          {/* {console.log(station)} */}
          <br></br>
          <Card.Subtitle>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>Access</span>
            {": "}
            {station.access_days_time}
          </Card.Subtitle>
          <Card.Subtitle>
            <br></br>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Distance
            </span>
            {": "}
            {station.distance.toFixed(2)} Miles
          </Card.Subtitle>
          <br></br>
          <Card.Subtitle>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Pricing
            </span>
            {": "}
            {station.ev_pricing}
          </Card.Subtitle>
          <br></br>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {" "}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginRight: "4px",
                  }}
                >
                  Reviews
                </span>
                {"\u00A0"}
                <Badge pill bg="secondary">
                  {station.comments ? station.comments.length : 0}
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                {station.comments && station.comments.length > 0 ? (
                  station.comments.map((comment) => (
                    <Alert variant="dark">
                      <Col xs={2} md={2}></Col>
                      <Image src="./thumbnail.png" circle />
                      {"\u00A0" + "\u00A0"}
                      {comment}
                    </Alert>
                  ))
                ) : (
                  <Alert variant="danger">No Reviews Yet</Alert>
                )}
                <br></br>
                <br></br>
                <div className="d-grid gap-2">
                  <Button
                    variant="dark"
                    onClick={handleAddReview}
                    direction="horizontal"
                    justify="center"
                  >
                    Add Review
                  </Button>{" "}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br></br>

          <div className="d-grid gap-2">
            <Button
              variant="dark"
              onClick={(e) =>
                handleGetDirections(stationLatitude, stationLongitude)
              }
            >
              Get Directions
            </Button>{" "}
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Your Review</h4>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={handleCommentChange}
                placeholder="Type Something..."
              />
            </Form.Group>{" "}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleAddComment}>
            Submit
          </Button>
          <Button variant="dark" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
