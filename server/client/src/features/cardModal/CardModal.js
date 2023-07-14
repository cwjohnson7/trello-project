import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import AddItem from "../utilities/AddItem";
import Comment from "../comment/Comment";  
import styles from "./CardModal.module.css";
import { updateCardName, updateCardNameThunk, updateCardDescription, updateCardDescriptionThunk, updateCardLabel, updateCardLabelThunk } from "../homeScreen/HomeScreenSlice";


const CardModal = ({ cardId, listId, boardId, visible, onClose }) => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const board = boards.find(board => board._id === boardId);
  const list = board.lists.find(list => list._id === listId);
  const card = list.cards.find(card => card._id === cardId);

  const dispatch = useDispatch();

  // Render and Edit Card Title
  const [cardNameEditing, setCardNameEditing] = useState(false);
  const handleCardNameClick = () => setCardNameEditing(true);

  // created local state to work with onChange attribute of input
  const [updatedCardName, setUpdatedCardName] = useState(card.name);

  // handleCardNameChange for dispatching
  const handleCardNameChange = () => {
    dispatch(updateCardName({ boardId, listId, cardId, updatedCardName }));
    dispatch(updateCardNameThunk({ name: updatedCardName, boardId, listId, cardId }));

    setCardNameEditing(false);
  };

  // handling the dispatch if the Enter key is pressed. 
  const handleEnter = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      handleCardNameChange();
    }
  };

  // autoFocus, onFocus, and handleFocus make sure the input is focused on when clicked and the text inside the input is highlighted
  const handleFocus = (e) => {
    e.currentTarget.select();
  };

  // onBlur in the input will invoke handleCardNameChange directly and happens when the focused input is clicked out of

  // render card name of edit list name by clicking
  const renderCardName = () => {
    return cardNameEditing ? (

      <div >
        <input onChange={e => setUpdatedCardName(e.target.value)} className={styles.editCardName} value={updatedCardName} onKeyUp={handleEnter} onFocus={handleFocus} autoFocus onBlur={handleCardNameChange}/>
      </div>
    ) : (
      <Modal.Title onClick={handleCardNameClick} style={{ cursor: "pointer" }}>{card.name}</Modal.Title>
    )
  }  

  
  // Code to handle editing of description textarea in card modal
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const handleDescriptionClick = () => setDescriptionEditing(true);
  const handleDecriptionClose = () => setDescriptionEditing(false);

  // created local state to work with onChange attribute of input
  const [updatedDescription, setUpdatedDescription] = useState(card.description);
  
  // function for adding description to state
  const handleDescriptionSave = () => {
    // code to add to state
    dispatch(updateCardDescription({ boardId, listId, cardId, updatedDescription }));
    dispatch(updateCardDescriptionThunk({ boardId, listId, cardId, description: updatedDescription }));

    setDescriptionEditing(false);
  };
  
  // rendering form for editing card description. I will likely move all this code to its own
  // file to clean this file up
  const renderCardDescription = () => {
    return descriptionEditing ? (
      <Form>
        <Form.Group className="mb-3">
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder={updatedDescription ? updatedDescription : "Add description here"} 
            value={updatedDescription}
            onChange={e => setUpdatedDescription(e.target.value)}
            autoFocus
            />
          <Button variant="primary" onClick={handleDescriptionSave}>Save Changes</Button>
          <Button variant="secondary" className="ms-1" onClick={handleDecriptionClose}>Close</Button>
        </Form.Group>
      </Form>
    ) : (
      <div onClick={handleDescriptionClick}>{card.description ? card.description : "Add description here"}</div>
    )
  };

  // handling card label change
  let updatedCardLabel = card.label;
  
  const handleCardLabelChange = (e) => {
    updatedCardLabel = e.target.value;

    dispatch(updateCardLabel({ boardId, listId, cardId, updatedCardLabel }));
    dispatch(updateCardLabelThunk({ boardId, listId, cardId, label: updatedCardLabel}));    
  };
 
  return (
    <div>
      <Modal size="lg" show={visible} onHide={onClose}>
        <Modal.Header closeButton>

          {/* Card Title in modal */}
          {renderCardName()}

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
                  <AddItem title="Comment" cardId={cardId} listId={listId} boardId={boardId} />
         
                  {/* Displays Comments. Maybe activities and comments can be in the same array */}
                  <Comment cardId={cardId} listId={listId} boardId={boardId} />  
                </Modal.Body>
              </Col>

              {/* Styling for label, move card, and archive buttons is added. Still need to add code to make these changes to state */}
              <Col md={4}>

                {/* Label Select */}
                <Modal.Title>Label</Modal.Title>
                <Form.Select 
                  value={updatedCardLabel} 
                  className={styles.selectBtn}
                  onChange={handleCardLabelChange}
                  >
                  <option value="" >None</option>
                  <option value="purple" >Purple</option>
                  <option value="blue" >Blue</option>
                  <option value="green" >Green</option>
                  <option value="yellow" >Yellow</option>
                  <option value="orange" >Orange</option>
                  <option value="red" >Red</option>
                </Form.Select>
                <hr />

                {/* Move Card Select */}
                <Modal.Title>Move Card to</Modal.Title>
                <Form.Select className={styles.selectBtn}>
                  <option>List</option>
                  {board.lists.map((list) => (
                    <option key={list._id}>{list.name}</option>
                  ))}
                </Form.Select>
                <hr />

                {/* Archive button */}
                <Modal.Title>Actions</Modal.Title>
                <div className={styles.actionButton}>Archive</div>
                <hr />
                
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default CardModal;