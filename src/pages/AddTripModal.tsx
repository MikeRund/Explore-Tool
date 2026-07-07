import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

type Props = {
  show: boolean;
  handleClose: () => void;
};

function AddTripModal({ show, handleClose }: Props) {
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTripForm.Date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="Enter date" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTripForm.Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTripModal;
