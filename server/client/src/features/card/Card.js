import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../utilities/ItemTypes";
import styles from "./Card.module.css"; 
import { startDrag, stopDrag } from "../homeScreen/DragDropSlice";
import { useDispatch } from "react-redux";


const Card = ({ id, name, listId }) => {
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

  return (
    <div ref={drag} key={id} className={styles.card} style ={{
      opacity: isDragging? 0.5 : 1
    }}>
      <p>{name}</p>
    </div>
  );
};

export default Card;
