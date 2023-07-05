import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import List from "./list";

const Board = () => {

  return (
    <BoardContainer>
      <Container>
        <h2>Board Name</h2>

        <Row>
        {/* Will map the lists array that belong to the board and return a List component for each list */}
        {/* {board.lists.map((listId, i) => {
          return <List listId={listId} key={listId} index={i} />;
        })} */}

          <List />

          <List />
        </Row>
      </Container>
    </BoardContainer>    
  )

};

export default Board;

const BoardContainer = styled.div`
  padding-top: 160px;
  height: 92%;
  display: flex;
  overflow-x: auto;
`;