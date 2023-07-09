import React, { useState } from 'react';
import { addCard, addCardThunk, addList, addListThunk, addBoard, addBoardThunk, addComment, addCommentThunk } from '../homeScreen/HomeScreenSlice';
import generateId from './generateId';
import { useDispatch } from 'react-redux';
import styleAddCard from "../list/List.module.css";
import styleAddList from "../board/Board.module.css";
import styleAddBoard from "../homeScreen/HomeScreen.module.css";
import styleAddComment from "../card/Card.module.css";

const AddItem = ({ title, boardId, listId, orgId, cardId }) => {
  const dispatch = useDispatch();
  const [addingItem, setAddingItem] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleAddClick = () => {
    setAddingItem(true);
  };

  const handleCancelClick = () => {
    setAddingItem(false);
    setInputValue('');
    setErrorMessage(null); 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(null); 
  };

  const handleSubmitClick = () => {
    if (inputValue.trim() !== '') {
      const _id = generateId(5);
      // depending on title prop dispatch appropriate action to add card, list, or board
      switch (title) {
        case 'Card':
          dispatch(addCard({ boardId, listId, _id, inputValue }));
          dispatch(addCardThunk({name: inputValue, boardId, listId, tempId: _id})); 
          break;
        case 'List':
          dispatch(addList({ boardId, _id, inputValue }));
          dispatch(addListThunk({ name: inputValue, boardId, tempId: _id }));
          break;
        case 'Board':
          dispatch(addBoard({ _id, inputValue, orgId }));
          dispatch(addBoardThunk({ title: inputValue, tempId: _id, orgId }));
          break;
        case 'Comment':
          dispatch(addComment({ _id, boardId, listId, cardId, inputValue }));
          dispatch(addCommentThunk({ text: inputValue, tempId: _id, cardId, listId, boardId }));
          break;
        default:
          console.log('No card title is passed into client/features/list/List.js!');
      }
      setAddingItem(false);
      setInputValue('');
    } else {
      setErrorMessage(`${title} cannot be empty!`); 
    }
  };
  
  // Handling the style of the add button dependent on Card, List, or Board
  const handleAddStyle = () => {
    switch (title) {
      case "Card":
        return styleAddCard.addCard;
      case "List":
        return styleAddList.addList;
      case "Board":
        return styleAddBoard.addBoard;
      case "Comment":
        return styleAddComment.addComment;
      default:
        return;
    };
  };
  
  // Handling the style of the input form dependent on Card, List, or Board
  const handleInputStyle = () => {
    switch (title) {
      case "Card":
        return styleAddCard.addCardForm;
      case "List":
        return styleAddList.addListForm;
      case "Board":
        return styleAddBoard.addBoardForm;
      case "Comment":
        return styleAddComment.addCommentForm;
      default:
        return;
    };
  }

  return addingItem ? (
    <div >
      <input type="text" value={inputValue} onChange={handleInputChange} className={handleInputStyle()} placeholder={`Add ${title} Title Here`} autoFocus/>
      <button onClick={handleSubmitClick} className="btn btn-primary ms-3">Add {title}</button>
      <button onClick={handleCancelClick} className="btn btn-secondary m-2">{'\u00D7'}</button>
      {errorMessage && <p>{errorMessage}</p>} 
    </div>
  ) : (
    <div onClick={handleAddClick} className={handleAddStyle()}>{"\uFF0B"} Add {title}</div>
  );
};

export default AddItem;

// VALUES TO PASS INTO REDUX ACTIONS SWITCH CASE BLOCK:

// ADD CARD: 
// sync:  dispatch(addCard({ boardId, listId, _id, inputValue}))
// async: dispatch(addCardThunk({ name: inputValue, boardId, listId, tempId: _id}))


// ADD LIST: 
// sync: dispatch(addList({ boardId, _id, inputValue }));
// async: dispatch(addListThunk({ name: inputValue, boardId, tempId: _id }))

// ADD BOARD:
// sync: dispatch(addBoard({ _id, inputValue, orgId }))
// async: dispatch(addBoardThunk({ title: inputValue, tempId: _id, orgId }))