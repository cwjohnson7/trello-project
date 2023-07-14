import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css"; 
import { startDrag, stopDrag } from "../homeScreen/DragDropSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CardModal from "../cardModal/CardModal";
import { Row, Col } from "react-bootstrap";


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


// create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);

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
        <Row>
          <Col md="auto" className={styles.cardName}>
          {name}
          </Col>
          <Col>
            <div style={{ backgroundColor: card.label }} className={styles.cardLabel}></div>
          </Col>
          
        </Row>
        
      </div>

      <CardModal 
        visible={showModal} 
        onClose={handleShowModal}
        cardId={id}
        listId={listId}
        boardId={boardId}
        />
    </div>
  );
};

export default Card;