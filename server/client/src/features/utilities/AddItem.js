import React, { useState } from 'react';
import { addCard, addCardThunk, addList, addListThunk, addBoard, addBoardThunk } from '../homeScreen/HomeScreenSlice';
import generateId from './generateId';
import { useDispatch } from 'react-redux';
import styleAddCard from "../list/List.module.css";

const AddItem = ({ title, boardId, listId, orgId }) => {
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
        default:
          console.log('No card title is passed into client/features/list/List.js!');
      }
      setAddingItem(false);
      setInputValue('');
    } else {
      setErrorMessage(`${title} cannot be empty!`); 
    }
  };

  const handleAddStyle = () => {
    if (title === "Add Card") {
      return styleAddCard.addCard;
    } 
  };

  const handleInputStyle = () => {
    if (title === "Add Card") {
      return styleAddCard.addCardForm;
    }
  }

  return addingItem ? (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} className={handleInputStyle()} placeholder="Add Card Title Here" autoFocus/>
      <button onClick={handleSubmitClick} className="btn btn-primary m-2">{title}</button>
      <button onClick={handleCancelClick} className="btn btn-secondary m-2">{'\u00D7'}</button>
      {errorMessage && <p>{errorMessage}</p>} 
    </div>
  ) : (
    <div onClick={handleAddClick} className={handleAddStyle()}>{"\uFF0B"} {title}</div>
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