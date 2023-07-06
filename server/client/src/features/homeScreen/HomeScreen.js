import React from 'react';
import { useSelector } from 'react-redux';
import List from '../list/List';
import AddItem from '../utilities/AddItem';

// HomeScreen Component
const HomeScreen = () => {
  const boards = useSelector((state) => state.homeScreen.boards);

  return (
    <div>
      {boards.map((board) => (
        <Board key={board._id} board={board} />
      ))}
    </div>
  );
};

// Board Component
const Board = ({ board }) => {
  return (
    <div>
      <h1>{board.title}</h1>
      <div>{board.lists.map((list) => (
        <List key={list._id} boardId={board._id} listId={list._id} />
        ))}
      </div>
      <AddItem title={'List'} boardId={ board._id }/>  
    </div>
  );
};

export default HomeScreen;