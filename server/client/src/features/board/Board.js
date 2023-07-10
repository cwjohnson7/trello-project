import React from 'react';
import List from '../list/List';
import { useSelector } from 'react-redux';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import AddItem from '../utilities/AddItem';
import styles from "./Board.module.css";

const Board = () => {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.homeScreen.boards);
  const location = useLocation();
  const path = matchPath("/boards/:boardId", location.pathname);
  const pathId = path.params.boardId;
  const board = boards.find(obj => obj._id === pathId);

  const handleBoardButtonClick = () => {
    navigate("/boards")
  };

  // I set this code up because when a new board is created there is no List array. A list array needs to be added at somepoint. 
  // I think we should do this when the board is made. If a new board comes default with empty arrays for Lists, Cards, and Comments then we avoid
  // writing several conditional statements when rendering each component and we'll avoid running into push errors.
  const renderLists = () => {
     
    if (board.lists) {
     
      return board.lists.map((list) => (
        <List key={list._id} boardId={board._id} listId={list._id} />
      ))
    } else {
      return;
    }
  }

  return (
    <div className={styles.boardContainer}>

      <div className={styles.boardTitle}>
          <h1>{board.title}</h1>
          <div onClick={handleBoardButtonClick} className={styles.boardButton}>Back to Boards</div>
      </div>
      
      <div className="d-flex mt-4">  

        {renderLists()}
        
        <AddItem title="List" boardId={board._id} />

      </div>
    </div> 
  );
};

export default Board;