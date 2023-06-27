import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const URL = "http://localhost:3000/fuel_stations";

export default function Individualcard({ station, stations, setStations }) {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  function handleCommentChange(event) {
    setComment(event.target.value);
  };

  function handleAddReview() {
    setShowModal(true);
  };

  function handleCloseModal() {
    setComment('');
    setShowModal(false);
  };

  function handleAddComment(e) {
    e.preventDefault();
    const updatedComments = station.comments ? [...station.comments, comment] : [comment];
    const updatedStation = {
      ...station,
      comments: updatedComments
    };

    fetch(`${URL}/${station.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ comments: updatedComments })
    })
      .then((response) => response.json())
      .then((data) => {
        // Find the index of the updated station in the stations array
        const updatedIndex = stations.findIndex(s => s.id === station.id);
        
        // Create a new stations array with the updated station
        const updatedStations = [
          ...stations.slice(0, updatedIndex),
          updatedStation,
          ...stations.slice(updatedIndex + 1)
        ];

        // Update the stations state with the updatedStations array
        setStations(updatedStations);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
      
    setShowModal(false);
  }

  return (
    <>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          {/* Card content */}
          <Card.Title>Name: {station.station_name.split(' - Tesla Supercharger')}</Card.Title>
          <Card.Subtitle>Address: {station.street_address}</Card.Subtitle>
          <Card.Subtitle>Access: {station.access_days_time}</Card.Subtitle>
          <Card.Subtitle>Distance: {station.distance.toFixed(2)} Mile</Card.Subtitle>
          <Card.Subtitle>Pricing: {station.ev_pricing}</Card.Subtitle>
          <Card.Subtitle>Review:</Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            {station.comments && station.comments.length > 0 ? station.comments.join('\n') : 'No Review yet...'}
          </Card.Text>
          <Button variant="secondary" onClick={handleAddReview}>
            Add Review
          </Button>{' '}
          <Button variant="primary">Get Direction</Button>{' '}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">asd</small>
        </Card.Footer>
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
          </Form>
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
