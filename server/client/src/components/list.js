import styled from "styled-components";
import Card from "./card";

const List = () => {

  return (
    <ListContainer>
      <ListTitle>
        List Title
      </ListTitle>

      {/* Map and return card components that belong to the List */}
      {/* {list.cards && list.cards.map((cardId, i) => (
        <Card key={cardId} cardId={cardId} index={i} listId={list._id} />
      ))} */}

      <Card />

    </ListContainer>
  )
};

export default List;

const ListContainer = styled.div`
  background: #ADC8D2;
  flex-shrink: 0;
  width: 275px;
  height: fit-content;
  margin: 10px;
  margin-right: 0;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const ListTitle = styled.div`
  cursor: pointer;
  padding: 10px;
  overflow-wrap: break-word;
`;