import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
  
const CardModal = (props) => {
  // create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Card Name</Modal.Title>
        </Modal.Header>
        <div className="ps-3">in list "ListName"</div>
        <Modal.Body>
          <Modal.Title>Description</Modal.Title>
          {/* {renderCardDescription()} */}
        </Modal.Body>
        <Modal.Body>
          <Modal.Title>Activity</Modal.Title>
          <ul>
            <li>Card Description</li>
            <li>Comments</li>
            <li>Activities</li>
            <li>Labeling capabilities</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleCloseModal}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
  )

};

export default CardModal;