import React, { useRef, useEffect, useImperativeHandle } from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css";
import { startDrag, stopDrag } from "../homeScreen/DragDropSlice";
import { moveCardWithinList} from "../homeScreen/HomeScreenSlice";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CardModal from "../cardModal/CardModal";
import { Row, Col } from "react-bootstrap";

const Card = ({ id, name, listId, index, boardId }) => {
  
  const boards = useSelector((state) => state.homeScreen.boards);
  const board = boards.find(board => board._id === boardId);
  const list = board.lists.find(list => list._id === listId);
  const card = list.cards.find(card => card._id === id);
  
  const dispatch = useDispatch();
  // create a reference to dom node of Card component in order to determine its height:
  const CardContainerRef = useRef(null);
  // use local state to track Card height to calculate card index changes as card is being moved
  const [cardHeight, setCardHeight] = useState(null);
  useEffect(() => {
    if (CardContainerRef.current) {
      setCardHeight(CardContainerRef.current.offsetHeight);
    }
  }, [CardContainerRef.current]);
  
  // FOLLOWING CODE IS USED FOR RDND FUNCTIONALITY
  const item = { id, name, listId, boardId, index, cardHeight };
  // connect Card to monitors state of React Drag and Drop via useDrag hook
  const [{ isDragging }, drag] = useDrag(() => {
    const item = { id, name, listId, boardId, index, cardHeight };
    return {
      type: ItemTypes.CARD,
      item,
      collect: (monitor, props) => ({
        isDragging: !!monitor.isDragging(),
      }),
    };
  }, [id, name, listId, boardId, index, cardHeight]);


  // create local state and functions for displaying modals for each card
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(!showModal);

  return (
    <div ref={CardContainerRef}>
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