import React, { useState } from 'react';
import { addCard, addCardThunk, addList, addListThunk, addBoard, addBoardThunk, addComment, addCommentThunk } from '../homeScreen/HomeScreenSlice';
import generateId from './generateId';
import { useDispatch, useSelector } from 'react-redux';
import styleAddCard from "../list/List.module.css";
import styleAddList from "../board/Board.module.css";
import styleAddBoard from "../homeScreen/HomeScreen.module.css";
import styleAddComment from "../card/Card.module.css";

const AddItem = ({ title, boardId, listId, orgId, cardId }) => {
  const token = useSelector((state) => state.auth.authenticated);
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


 // Move CSS assignment here:
 let InputSelectorCSS = '';
 let AddButtonCSS = '';

 switch (title) {
   case 'Card':
     InputSelectorCSS = styleAddCard.addCardForm;
     AddButtonCSS = styleAddCard.addCard;
     break;
   case 'List':
     // Assign appropriate classes for List
     break;
   case 'Board':
     // Assign appropriate classes for Board
     break;
   default:
     console.log('No card title is passed into client/features/list/List.js!');
 }

 const handleSubmitClick = () => {
  if (inputValue.trim() !== '') {
    const _id = generateId(5);
    // depending on title prop dispatch appropriate action to add card, list, or board AND apply proper styling
    switch (title) {
      case 'Card':
        dispatch(addCard({ boardId, listId, _id, inputValue }));
        dispatch(addCardThunk({ data: {name: inputValue, boardId, listId, tempId: _id}, token })); 
        break;
      case 'List':
        dispatch(addList({ boardId, _id, inputValue }));
        dispatch(addListThunk({ data: { name: inputValue, boardId, tempId: _id }, token }));
        break;
      case 'Board':
        dispatch(addBoard({ _id, inputValue, orgId }));
        dispatch(addBoardThunk({ data: { title: inputValue, tempId: _id, orgId }, token }));
        break;
      case 'Comment':
        console.log(`AddItem Comment Case has following values: ${_id}, ${boardId}, ${listId}, ${cardId}, ${inputValue}`);
        dispatch(addComment({ _id, boardId, listId, cardId, inputValue }));
        dispatch(addCommentThunk({ data: { text: inputValue, tempId: _id, cardId, listId, boardId }, token }));
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
  
  // Handling the AddItem and Input style dependent on Card, List, Board, Comment
  let addItemStyle;
  let addInputStyle;
  switch (title) {
    case "Card":
      addItemStyle = styleAddCard.addCard;
      addInputStyle = styleAddCard.addCardForm;
      break;
    case "List":
      addItemStyle = styleAddList.addList;
      addInputStyle = styleAddList.addListForm;
      break;
    case "Board":
      addItemStyle = styleAddBoard.addBoard;
      addInputStyle = styleAddBoard.addBoardForm;
      break;
    case "Comment":
      addItemStyle = styleAddComment.addComment;
      addInputStyle = styleAddComment.addCommentForm;
      break;
    default:
      return;
  }

  return addingItem ? (
    <div >
      <input type="text" value={inputValue} onChange={handleInputChange} className={addInputStyle} placeholder={`Add ${title} Title Here`} autoFocus/>
      <button onClick={handleSubmitClick} className="btn btn-primary ms-3">Add {title}</button>
      <button onClick={handleCancelClick} className="btn btn-secondary m-2">{'\u00D7'}</button>
      {errorMessage && <p>{errorMessage}</p>} 
    </div>
  ) : (
    <div onClick={handleAddClick} className={addItemStyle}>{"\uFF0B"} Add {title}</div>
  );
};

export default AddItem;