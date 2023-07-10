import React from "react";
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";
import { Form, Button } from "react-bootstrap";


const Comment = ({ cardId, listId }) => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const location = useLocation();
  const path = matchPath("/boards/:boardId", location.pathname);
  const pathId = path.params.boardId;
  const board = boards.find(board => board._id === pathId);
  const list = board.lists.find(list => list._id === listId);
  const card = list.cards.find(card => card._id === cardId);
 
  // Renders comments associated with its card
  // If we combine comments and activities this should easily display both in the card modal
  if (card.comments) {
    return card.comments.map((comment) => (
      <div key={comment._id}>
        <hr />
        <div>{comment.createdBy} {'\uff5c'} {comment.text}</div>
      </div>
    ))
  } else {
    return;
  }
};

export default Comment;