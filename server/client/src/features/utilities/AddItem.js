import React, { useState } from 'react';
import addCard from '../homeScreen/HomeScreenSlice';
import generateId from './generateId';
import { useDispatch } from 'react-redux';


const AddItem = ({ title, boardId, listId }) => {
  const dispatch = useDispatch();
  const [addingItem, setAddingItem] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    setAddingItem(true);
  };

  const handleCancelClick = () => {
    setAddingItem(false);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(`input value inside handleInputChange is below`);
    console.log(inputValue);
  };

  const handleSubmitClick = () => {
    const _id = generateId(5);
    console.log(`payload values inside handleSubmitClick`);
    console.log({boardId, listId, _id, inputValue});
    dispatch(addCard({ boardId, listId, _id, inputValue }));
    setAddingItem(false);
    setInputValue('');
  };

  return addingItem ? (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmitClick}>{title}</button>
      <button onClick={handleCancelClick}>{'\u00D7'}</button>
    </div>
  ) : (
    <button onClick={handleAddClick}>{title}</button>
  );
};

export default AddItem;
