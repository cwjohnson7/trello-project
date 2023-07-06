import React, { useMemo} from "react";
import Card from "../card/Card";
import styles from "./List.module.css";
import ItemTypes from "../utilities/ItemTypes";
import AddItem from "../utilities/AddItem";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { moveCard, listDataSelector, moveCardThunk } from "../homeScreen/HomeScreenSlice";


const List = ({ boardId, listId }) => {
  // console.log(`boardId: ${boardId} listId: ${listId}`);
  // console.log(`board id: ${boardId} and list id: ${listId}`);
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

  return (
    <div
      className={styles.sourceColumn}
      ref={drop}
      style={{ backgroundColor: isOver ? "blue" : "white" }}
    >
      <p style={{'text-align':'center', 'background-color':'orange', }}>{listName}</p>
      {/* {canDrop ? "Release to drop" : "Drag a box here"} */}
      {cards.map((card) => (
        <Card key={card._id} id={card._id} name={card.name} listId={listId} />
      ))}
      <AddItem title="Card" boardId={boardId} listId={listId}/>
    </div>
  );
};

export default List;
