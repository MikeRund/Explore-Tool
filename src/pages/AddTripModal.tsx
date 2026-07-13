import { useState } from "react";
import type { Trip } from "../api/tripApi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import type { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";
import { postTripAsync } from "../state/tripSlice";

type Props = {
  show: boolean;
  handleClose: () => void;
};

function AddTripModal({ show, handleClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newTrip = {
      title: destination,
      description: description,
      date: date,
      itineraryItems: [],
      packingList: [],
    };
    console.log("New Trip:", newTrip);
    dispatch(postTripAsync(newTrip));
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Where's your next adventure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addTripForm.Destination">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                autoFocus
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTripForm.Date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                autoFocus
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTripForm.Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTripModal;
