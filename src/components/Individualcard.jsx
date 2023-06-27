import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Map from './map';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Individualcard({ station }) {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  function handleCommentChange(event){
    setComment(event.target.value);
  };

  function handleAddReview(){
    setShowModal(true);
  };

  function handleCloseModal() {
    setComment('')
    setShowModal(false);
  };

  function handleAddComment (e) {
    e.preventDefault()

    setShowModal(false);
  }

  console.log (comment)

  return (
    <>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          {/* <Map/> */}
          <Card.Title>
            Name: {station.station_name.split(' - Tesla Supercharger')}
          </Card.Title>
          <Card.Subtitle>Address: {station.street_address}</Card.Subtitle>
          <Card.Subtitle>Access: {station.access_days_time}</Card.Subtitle>
          <Card.Subtitle>
            Distance: {station.distance.toFixed(2)} Mile
          </Card.Subtitle>
          <Card.Subtitle>Pricing: {station.ev_pricing}</Card.Subtitle>
          <Card.Subtitle>Review:</Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-line' }}> {comment ? comment : 'No Review yet...'} </Card.Text>
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
