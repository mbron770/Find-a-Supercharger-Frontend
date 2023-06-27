import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

const URL = "http://localhost:3000/fuel_stations";

export default function Individualcard({ station, stations, setStations }) {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

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
  }

  return (
    <>
      <Card bg="white" style={{ flex: "1" }}>
        <Card.Header
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontFamily: "Helvetica Neue",
            fontStyle: "normal",
            // fontWeight: "Bold",
          }}
        >
          {" "}
          {station.station_name.split(" - Tesla Supercharger")}
        </Card.Header>

        <Card.Body>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12097.33410972836!2d-74.0182606!3d40.7106737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1687553644224!5m2!1sen!2sus"
            width="100%"
            height="300"
            // style={{ border: }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          {/* <Map/> */}
          {"\u00A0"}
          <Card.Title>{station.street_address}</Card.Title>
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
                {station.comments && station.comments.length > 0
                  ? station.comments.join("\n")
                  : "No Reviews yet..."}
                <br></br>
                <br></br>
                <Button variant="secondary" onClick={handleAddReview}>
                  Add Review
                </Button>{" "}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <Card.Text style={{ whiteSpace: "pre-line" }}>
            {station.comments && station.comments.length > 0
              ? station.comments.join("\n")
              : "No Review yet..."}
          </Card.Text> */}
          <br></br>
          <Button variant="primary">Get Direction</Button>{" "}
        </Card.Body>

        {/* <Card.Footer>
          <small className="text-muted">asd</small>
        </Card.Footer> */}
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Text:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={handleCommentChange}
              />
            </Form.Group>
       1   </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddComment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

