import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Card = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  return (
    <div>
      <CardContainer onClick={handleShowModal}>
        Card Text/Title
      </CardContainer>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Card Title Here!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
    </div>
  )
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  cursor: pointer;
  background: white;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  min-height: 18px;
`;