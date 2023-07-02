import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css"; 

const Card = ({ id, text, handleCardDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, text },
    collect: (monitor, props) => ({
      isDragging: !!monitor.isDragging(),
    }),
    //when drag operation ends:
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        // When the drag operation ends and the item was dropped
        // (i.e., it was dropped on a DropTarget that did not have a drop effect of 'none')
        handleCardDrop(item.id);
      }
    },
  }));
  return (
    <div ref={drag} key={id} className={styles.card} style ={{
      opacity: isDragging? 0.5 : 1
    }}>
      <p>{text}</p>
    </div>
  );
};

export default Card;
