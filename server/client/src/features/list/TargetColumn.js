import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";

const TargetColumn = ({ id = "target" }) => {
  // define List state to be used as a source of cards to display
  const [cards2Display, setCards2Display] = useState([]);
  // remove card from component state once it is dropped
 const handleCardDrop = (id) => {
  setCards2Display((state) => state.filter((card) => card.id !== id));
};
  // Make list Draggable and track if List is being dragged (isDragging?) via monitor function of DnD state variable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  // Make List Droppable and track is List is being dropped (isOver) via monitor funciton of DnD state variable
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      console.log(`drop the base!`);
      setCards2Display((oldCards) => [...oldCards, item]); // Add dropped card
      return { listId: id }; // Return drop result
    },
  }));
  return (
    <div
      className={styles.targetList}
      ref={drop}
      style={{ backgroundColor: isOver ? "red" : "white" }}
    >
      <p>IN PROGRESS
      </p>
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      {cards2Display.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} handleCardDrop={handleCardDrop}/>
      ))}
    </div>
  );
};

export default TargetColumn;
