import React from 'react';
import { useSelector } from 'react-redux';
import List from '../list/List';
import styled from "styled-components";

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
    <BoardContainer>
      <BoardTitle>
        <h1>{board.title}</h1>
      </BoardTitle>
      
      <div className="d-flex mt-5">  
        {board.lists.map((list) => (
          <List key={list._id} boardId={board._id} listId={list._id} />
        ))}
  
        <AddList>
          {"\uFF0B"} Add List
        </AddList>
      </div>
    </BoardContainer> 
  );
};

export default HomeScreen;

const BoardTitle = styled.div`
  position: relative;
  margin-left: 10px;
`;

const BoardContainer = styled.div`
  padding-top: 150px;
  height: 100%;
  margin-left: 50px;
`;

const AddList = styled.div`
  background: rgba(173,200,210, 0.5);
  flex-shrink: 0;
  width: 275px;
  height: 50px;
  margin: 10px;
  margin-right: 0;
  border-radius: 10px;
  cursor: pointer;
  padding: 12px;
  padding-left: 15px;
  overflow-wrap: break-word;
  &:hover {
    background-color: rgba(173,200,210, 0.3);
  }
`;