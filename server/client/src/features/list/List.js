import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";
import AddItem from "../utilities/AddItem";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moveCard, listDataSelector, moveCardThunk } from "../homeScreen/HomeScreenSlice";
import { Row } from "react-bootstrap";


const List = ({ boardId, listId }) => {
  const dispatch = useDispatch();
  // return cards and name belonging to current list
  const { cards, listName } = useSelector((state) => {
    // find board with the id matching board id prop that is passed to the List via "listId" prop from HomeScreen component
    const board = state.homeScreen.boards.find((board) => board._id === boardId);
    if (!board) return { cards: [], name: "" };

    const list = board.lists.find((list) => list._id === listId);
    if (!list) return { cards: [], name: "" };

    return { cards: list.cards, listName: list.name };
  });
  // // return cards and name belonging to current list
  // const { cards, listName } = useSelector(state => listDataSelector(state, boardId, listId));

  // Make List Droppable and track is List is being dropped (isOver) via monitor funciton of DnD state variable
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    canDrop: (item, monitor) => {
      return item.listId !== listId;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      dispatch(
        moveCard({
          boardId,
          sourceListId: item.listId,
          targetListId: listId,
          cardId: item.id,
          cardName: item.name,
        })
      );
      dispatch(moveCardThunk({
        sourceListId: item.listId,
        targetListId: listId,
        cardId: item.id,
      }))
      return { listId: listId }; // Return drop result
    },
  }));

  // Render and Edit List Title 
  // Still need to add code to change the value in state and database
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
        <input value={listName} onKeyUp={handleTitleChange} onFocus={handleFocus} autoFocus/>
      </EditTitle>
    ) : (
      <div className="container">
        <div className="row pt-2 pb-2">
          <ListTitle onClick={handleInitialTitleClick}  className="col-md-8">
            {listName}
          </ListTitle>
          <div className="col-md-4">Cards: {cards.length} </div>
        </div>
      </div>
      
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
      {cards.map((card) => (
        <Card key={card._id} id={card._id} name={card.name} listId={listId} boardId={boardId}/>
      ))}

      {/* Just commenting AddItem out for now. Need to figure out how to incorporate styling and logic */}
      <AddItem title="Card" boardId={boardId} listId={listId} />

    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  background: #ADC8D2;
  width: 275px;
  height: fit-content;
  margin: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const ListTitle = styled.div`
  cursor: pointer;
  font-weight: 500;
  overflow-wrap: break-word;
`;

const EditTitle = styled.div`
  padding: 8px;
`;

// const AddCard = styled.div`
//   cursor: pointer;
//   margin: 5px;
//   padding: 3px;
//   border-radius: 10px;
//   &:hover {
//     background-color: rgb(222, 237, 237);
//   }
// `;
