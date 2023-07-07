import React from 'react';
import List from '../list/List';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import AddItem from '../utilities/AddItem';

const Board = () => {
  const navigate = useNavigate();
  const boards = useSelector((state) => state.homeScreen.boards);
  const location = useLocation();
  const path = matchPath("/boards/:boardId", location.pathname);
  const pathId = path.params.boardId;
  const board = boards.find(obj => obj._id === pathId);

  const handleBoardButtonClick = () => {
    navigate("/boards")
  }

  return (
    <BoardContainer>
      <BoardTitle>
          <h1>{board.title}</h1>
          <BoardButton onClick={handleBoardButtonClick}>Back to Boards</BoardButton>
      </BoardTitle>
      
      <div className="d-flex mt-4">  
        {board.lists.map((list) => (
          <List key={list._id} boardId={board._id} listId={list._id} />
        ))}
  
        <AddItem title="List" boardId={board._id} />

      </div>
    </BoardContainer> 
  );
};

export default Board;

const BoardTitle = styled.div`
  position: relative;
  margin-left: 10px;
`;

const BoardContainer = styled.div`
  padding-top: 150px;
  height: 100%;
  margin-left: 50px;
`;

const BoardButton = styled.div`
  font-size: 1.25rem;
  width: fit-content;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  border: 1px;
  &:hover {
    cursor: pointer;
    color: gray;
    text-decoration: underline;
  }
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