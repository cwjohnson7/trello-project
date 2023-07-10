import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css"; 
import { startDrag, stopDrag } from "../homeScreen/DragDropSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import CardModal from "../CardModal";
import AddItem from "../utilities/AddItem";
import Comment from "../comment/Comment";



const Card = ({ id, name, listId, boardId }) => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const board = boards.find(board => board._id === boardId);
  const list = board.lists.find(list => list._id === listId);
  const card = list.cards.find(card => card._id === id);

  const dispatch = useDispatch();
  const item = { id, name, listId };
  // connect Card to monitors state of React Drag and Drop via useDrag hook
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item,
    collect: (monitor, props) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // when drag operation begins following function is invoked
    // begin: (monitor) => {
    //   dispatch(startDrag(item)); // You may also want to include other properties such as initial listId
    // },
    //when drag operation ends:
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        // If the item was not dropped into a target, don't do anything
        return;
      }
      const dropResult = monitor.getDropResult();
      dispatch(stopDrag({id, listId: dropResult.listId})); 
    },
  }));
    // // start drag operation:
    // if(isDragging) dispatch(startDrag(item));


  // Code to handle editing of description textarea in card modal
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const handleDescriptionClick = () => setDescriptionEditing(true);
  const handleDecriptionClose = () => setDescriptionEditing(false);

  // function for adding description to state
  const handleDescriptionSaveClick = () => {
    // code to add to state

    setDescriptionEditing(false);
  };

  // rendering form for editing card description. I will likely move all this code to its own
  // file to clean this file up
  const renderCardDescription = () => {
    return descriptionEditing ? (
      <Form>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} placeholder="Add description here" />
          <Button variant="primary" onClick={handleDescriptionSaveClick}>Save Changes</Button>
          <Button variant="secondary" className="ms-1" onClick={handleDecriptionClose}>Close</Button>
        </Form.Group>
      </Form>
    ) : (
      <div onClick={handleDescriptionClick}>{card.description}</div>
    )
  };

// create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  

  return (
    <div>
      {/* Cards displayed in lists */}
      <div 
        className={styles.cardContainer}
        ref={drag} 
        key={id} 
        style ={{ opacity: isDragging? 0.5 : 1 }} 
        onClick={handleShowModal}
      >
        {name}
      </div>

      {/* I'm hoping I can figure out a way to have the modal in its own separate file/folder -William*/}
      <Modal size="lg" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>

          {/* Card Title in modal */}
          <Modal.Title>{name}</Modal.Title>

          {/* Card Label in modal */}
          <div className={styles.cardLabel}style={{ backgroundColor: card.label }}></div>
        </Modal.Header>

        {/* Shows what list the card is part of in the modal */}
        <div className="ps-3">in list <span className={styles.list}>{list.name}</span></div>

        <Modal.Body>
          <Container>
            <Row>
              <Col md={8}>
                <Modal.Body>

                  {/* Card Description */}
                  <Modal.Title>Description</Modal.Title>
                  {renderCardDescription()} 
                </Modal.Body>
           
                <Modal.Body>

                  {/* Shows Comments and activities associated with the card */}
                  <Modal.Title>Activity</Modal.Title>

                  {/* Add Comment Button */}
                  <AddItem title="Comment" cardId={id} listId={listId} boardId={boardId} />
         
                  {/* Displays Comments. Maybe activities and comments can be in the same array */}
                  <Comment cardId={id} listId={listId} boardId={boardId} />  
                </Modal.Body>
              </Col>

              {/* Styling for label, move card, and archive buttons is added. Still need to add code to make these changes to state */}
              <Col md={4}>

                {/* Label Select */}
                <Modal.Title>Label</Modal.Title>
                <Form.Select className={styles.selectBtn}>
                  <option>Label</option>
                  <option>None</option>
                  <option>Purple</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Orange</option>
                  <option>Red</option>
                </Form.Select>
                <hr />

                {/* Move and Archive buttons */}
                <Modal.Title>Actions</Modal.Title>
                <div className={styles.actionButton}>Move</div>
                <div className={styles.actionButton}>Archive</div>
                <hr />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Card;