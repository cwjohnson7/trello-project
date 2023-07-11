import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";
import AddItem from "../utilities/AddItem";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  moveCard,
  moveCardWithinList,
  moveCardThunk,
} from "../homeScreen/HomeScreenSlice";

const List = ({ boardId, listId }) => {
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
  const [listTitle, setListTitle] = useState("List Title");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e) => {
    e.preventDefault();

    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleInitialTitleClick = () => {
    setIsEditing(true);
  };

  const handleFocus = (e) => {
    e.currentTarget.select();
  };

  const renderListTitle = () => {
    return isEditing ? (
      <EditTitle>
        <input
          value={listName}
          onChange={(e) => setListTitle(e.currentTarget.value)}
          onKeyUp={handleTitleChange}
          onFocus={handleFocus}
          autoFocus
        />
      </EditTitle>
    ) : (
      <ListTitle onClick={handleInitialTitleClick}>{listName}</ListTitle>
    );
  };

  return (
    <ListContainer
      // className={styles.sourceColumn}
      ref={drop}
      style={{ backgroundColor: isOver ? "blue" : "#ADC8D2" }}
    >
      {renderListTitle()}
      {/* <ListTitle>{listName}</ListTitle> */}
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      {cards.map((card, index) => (
          <Card
            key={card._id}
            id={card._id}
            name={card.name}
            listId={listId}
            index={index}
          />
        ))}

      {/* Just commenting AddItem out for now. Need to figure out how to incorporate styling and logic */}
      <AddItem title="Card" boardId={boardId} listId={listId} />

      {/* <AddCard>
        {"\uFF0B"} Add Card
      </AddCard> */}
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  background: #adc8d2;
  width: 275px;
  height: fit-content;
  margin: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const ListTitle = styled.div`
  cursor: pointer;
  padding: 10px;
  overflow-wrap: break-word;
`;

const EditTitle = styled.div`
  padding: 8px;
`;
