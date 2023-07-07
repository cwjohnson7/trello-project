import styled from "styled-components";
import Card from "./card";
import { useState } from "react";

const List = () => {
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
  }

  const renderListTitle = () => {
    return isEditing ? (
      <EditTitle>
        <input value={listTitle} onChange={e => setListTitle(e.currentTarget.value)} onKeyUp={handleTitleChange} onFocus={handleFocus} autoFocus/>
      </EditTitle>
    ) : (
      <ListTitle onClick={handleInitialTitleClick}>
        {listTitle}
      </ListTitle>
    );
  };
  

  return (
    <ListContainer>
      {renderListTitle()}

      {/* Map and return card components that belong to the List */}
      {/* {list.cards && list.cards.map((cardId, i) => (
        <Card key={cardId} cardId={cardId} index={i} listId={list._id} />
      ))} */}

      <Card />
      <Card />
      <AddCard>
        {"\uFF0B"} Add Card
      </AddCard>

    </ListContainer>
  )
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
  padding: 10px;
  overflow-wrap: break-word;
`;

const EditTitle = styled.div`
  padding: 8px;
`;

const AddCard = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 3px;
  border-radius: 10px;
  &:hover {
    background-color: rgb(222, 237, 237);
  }
`;