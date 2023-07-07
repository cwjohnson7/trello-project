import styled from "styled-components";
import Container from "react-bootstrap";
import Row from "react-bootstrap";
import Button from "react-bootstrap";
import Col from "react-bootstrap";

import List from "./list";

const Board = () => {

  return (
    <BoardContainer>
      <BoardTitle>
        <h2>Board Name</h2>
      </BoardTitle>
      
      <div className="d-flex mt-5">
        
        {/* Will map the lists array that belong to the board and return a List component for each list */}
        {/* {board.lists.map((listId, i) => {
          return <List listId={listId} key={listId} index={i} />;
        })} */}
        
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />

        <AddList>
          {"\uFF0B"} Add List
        </AddList>
      </div>
    </BoardContainer>    
  )
};

export default Board;

const BoardTitle = styled.div`
  position: fixed;
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



