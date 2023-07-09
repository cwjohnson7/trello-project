import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddItem from "./utilities/AddItem";
import Comment from "./comment/Comment";  


const CardModal = ({ cardId, listId, setShow }) => {
  // create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
console.log(setShow, "modal")
console.log(showModal, "showModal");

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
          <AddItem title="Comment" />
         
          <Comment cardId={cardId} listId={listId} /> 
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>Save Changes</Button>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          
        </Modal.Footer>
      </Modal>
  )

};

export default CardModal;