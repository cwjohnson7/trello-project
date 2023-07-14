import React, { useMemo, useState } from "react";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";
import AddItem from "../utilities/AddItem";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { moveCard, listDataSelector, moveCardWithinList, moveCardThunk, updateListName, updateListNameThunk } from "../homeScreen/HomeScreenSlice";


const List = ({ boardId, listId }) => {
  const token = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  // return cards and name belonging to current list
  const { cards, listName } = useSelector((state) => {
    // find board with the id matching board id prop that is passed to the List via "listId" prop from HomeScreen component
    const board = state.homeScreen.boards.find(
      (board) => board._id === boardId
    );
    if (!board) return { cards: [], name: "" };

    const list = board.lists.find((list) => list._id === listId);
    if (!list) return { cards: [], name: "" };

    return { cards: list.cards, listName: list.name };
  });

  // Make List Droppable and track is List is being dropped (isOver) via monitor funciton of DnD state variable

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      // Check if the hover is happening over the list to prevent index miscalculation
      if (!monitor.isOver()) {
        return;
      }

      let newIndex;
      const delta = monitor.getDifferenceFromInitialOffset();
      let moveY = Math.round(delta.y / item.cardHeight);
      console.log(`moveY is ${moveY}`);

      // The card is being moved within the same list
      if (item.listId === listId) {

        newIndex = item.index + Math.round(moveY);

        // Ensure the new index stays within the range of 0 to cards.length - 1
        newIndex = Math.max(0, newIndex);
        newIndex = Math.min(cards.length - 1, newIndex);

        dispatch(
          moveCardWithinList({
            sourceIndex: item.index,
            targetIndex: newIndex,
            listId,
            boardId,
          })
        );
      } else {
        // card is moved to a different list, add to the end of targetList
        dispatch(
          moveCard({
            boardId,
            sourceListId: item.listId,
            targetListId: listId,
            cardId: item.id,
          })
        );
        dispatch(
          moveCardThunk({
            sourceListId: item.listId,
            targetListId: listId,
            cardId: item.id,
          })
        );
      }

      return { listId: listId }; // Return drop result
    },
  }));

  // Render and Edit List Title 
  const [isEditing, setIsEditing] = useState(false);
  const handleListNameClick = () => setIsEditing(true);

  // created local state to work with onChange attribute of input
  // there's probably a better way but this works for now
  const [updatedListName, setUpdatedListName] = useState(listName);

  // handle ListNameChange for dispatching
  const handleListNameChange = () => {
      dispatch(updateListName({ boardId, listId, updatedListName }));
      dispatch(updateListNameThunk({ data: { name: updatedListName, boardId, listId}, token }));

      setIsEditing(false);
  };

  // handling the dispatch if the Enter key is pressed. 
  const handleEnter = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      handleListNameChange();
    }    
  };

  const handleFocus = (e) => {
    e.currentTarget.select();
  };

  // onBlur in the input will invoke handleCardNameChange directly and happens when the focused input is clicked out of

  // Render List title and # of cards or edit list title by clicking
  const renderListName = () => {
    return isEditing ? (

      <div className={styles.editListTitle}>
        <input onChange={e => setUpdatedListName(e.target.value)} value={updatedListName} onKeyUp={handleEnter} onFocus={handleFocus} autoFocus onBlur={handleListNameChange} />
      </div>

    ) : (

      <div className="container">
        <div className="row pt-2 pb-2">

          <div onClick={handleListNameClick}  className="col-md-8">
            <div className={styles.listTitle}>
              {listName}
            </div>
          </div>

          <div className="col-md-4">
            Cards: {cards.length}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div 
      className={styles.listContainer}
      ref={drop}
      style={{ backgroundColor: isOver ? "blue" : "#ADC8D2" }}
    >
      {renderListName()}
      
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      {cards.map((card) => (
        <Card key={card._id} id={card._id} name={card.name} listId={listId} boardId={boardId}/>
      ))}

      <AddItem title="Card" boardId={boardId} listId={listId} />

    </div>
  );
};

export default List;
