import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
const baseURl = process.env.TBD;

const initialState = {
  user: {
    _id: "sf24d",
    firstName: "Yegor",
    lastName: "Rodin",
    organization: "Parsity",
  },
  boards: [
    {
      _id: "089sd",
      title: "Daily Planner",
      lists: [
        {
          _id: "j2h43",
          name: "To Do",
          cards: [
            { _id: "sdfff", name: "Work Out" },
            { _id: "234dd", name: "Meal Prep" },
            { _id: "dgdsf", name: "Walk a Dog" },
            { _id: "gsf32", name: "Practice Coding" },
          ],
        },
        { _id: "34rfc", name: "Doing", cards: [] },
        { _id: "ok097", name: "Done", cards: [] },
      ],
    },
    {
      _id: "klm87",
      title: "Networking",
      lists: [
        {
          _id: "kiji5",
          name: "To Do",
          cards: [
            { _id: "vvbbh", name: "Attend Meetup" },
            { _id: "9idfd", name: "Follow up with CTO" },
            { _id: "00233", name: "Post on LinkedIn" },
            { _id: "vdfv4", name: "Speak at a Conference" },
          ],
        },
        { _id: "sdf34", name: "Doing", cards: [] },
        { _id: "09fgd", name: "Done", cards: [] },
      ],
    },
  ],
};

export const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState,
  reducers: {
    moveCard: (state, action) => {
      // find and remove card from its original list
      // find board
      const board = state.boards.find(
        (board) => board._id === action.payload.boardId
      );
      if (!board) return;

      // find list in the board
      const list = board.lists.find(
        (list) => list._id === action.payload.sourceListId
      );
      if (!list) return;

      // find index of the card in the list
      const cardIndex = list.cards.findIndex(
        (card) => card._id === action.payload.cardId
      );

      // remove card from the list if found
      if (cardIndex !== -1) {
        list.cards.splice(cardIndex, 1);
      }

      // find target list
      const targetList = board.lists.find(
        (list) => list._id === action.payload.targetListId
      );
      if (!targetList) return;

      // add card to target list
      targetList.cards.push({
        _id: action.payload.cardId,
        name: action.payload.cardName,
        // other card properties...
      });
    },
    addCard: (state, action) => {
      // find board
      const board = state.boards.find(
        (board) => board._id === action.payload.boardId
      );
      if (!board) return;

      // find list in the board
      const list = board.lists.find(
        (list) => list._id === action.payload.listId
      );
      if (!list) return;
      list.cards.push({ _id: action.payload._id, name: action.payload.inputValue });
    },
  },
  extraReducers: (builder) => {},
});

export const { moveCard, addCard } = homeScreenSlice.actions;
export default homeScreenSlice.reducer;
