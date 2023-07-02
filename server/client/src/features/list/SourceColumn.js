import React, {useState, useEffect} from "react";
import DummyCards from "../utilities/DummyCards";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";
import { useDrop } from "react-dnd";


const SourceColumn = ({ id = "target" }) => {
  const [cards2Display, setCards2Display] = useState([]);
  // when component mounts hydrate the state with dummy cards
  useEffect(() => {
    setCards2Display((state)=> {
      return [...state, ...DummyCards]
    }
    )
  }, [])
 // remove card from component state once it is dropped
 const handleCardDrop = (id) => {
  setCards2Display((state) => state.filter((card) => card.id !== id));
};
// Make List Droppable and track is List is being dropped (isOver) via monitor funciton of DnD state variable
const [{ canDrop, isOver }, drop] = useDrop(() => ({
  accept: ItemTypes.CARD,
  collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
  drop: (item, monitor) => {
    setCards2Display((oldCards) => [...oldCards, item]); // Add dropped card
    return { listId: id }; // Return drop result
  },}));

  return (
    <div className={styles.sourceColumn} ref={drop} style={{ backgroundColor: isOver ? "blue" : "white" }}>
      <p>TO DO</p>
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      {cards2Display.map((card) => (
        <Card key={card.id} id={card.id} text={card.text} handleCardDrop={handleCardDrop}/>
      ))}
    </div>
  );
};

export default SourceColumn;
