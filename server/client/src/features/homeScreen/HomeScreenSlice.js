import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import createThunk from "../utilities/createThunk";

const initialState = {
  user: {
    _id: "sf24d",
    firstName: "Yegor",
    lastName: "Rodin",
    orgId: '64a720b83b8a0cd93ea4f327',
    orgName: "Parsity"
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

// requests to add card in DB and replaces redux card's tempId with DB card._id
export const addCardThunk = createThunk(
  "homeScreen/addCardThunk",
  "/api/addCard",
  "POST"
);

export const moveCardThunk = createThunk(
  "homeScreen/moveCardThunk",
  "/api/moveCard",
  "PUT"
);

export const addListThunk = createThunk(
  "homeScreen/addListThunk",
  "/api/addList",
  "POST"
);

export const addBoardThunk = createThunk(
  "homeScreen/addBoardThunk",
  "/api/addBoard",
  "POST"
);

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
      list.cards.push({
        _id: action.payload._id,
        name: action.payload.inputValue,
      });
    },

    addList: (state, action) => {
      // find board
      const board = state.boards.find(
        (board) => board._id === action.payload.boardId
      );
      if (!board) {
        console.log('no board found inside addList reducer!');
        return;
      }
      
      // add list to board
      board.lists.push({
        _id: action.payload._id,
        name: action.payload.inputValue,
        cards: [],
      });
    },

    addBoard: (state, action) => {
      state.boards.push({
        _id: action.payload._id,
        org: action.payload.org,
        title: action.payload.inputValue,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCardThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
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
        // find card in the list by its temporary ID
        const card = list.cards.find(
          (card) => card._id === action.payload.tempId
        );
        if (!card) return;

        // update card's _id with the new _id from the payload
        card._id = action.payload.card._id;
      })
      .addCase(addCardThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(moveCardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(moveCardThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(moveCardThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addListThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addListThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        // update list._id from temp to DB id
        // find board
        const board = state.boards.find(
          (board) => board._id === action.payload.boardId
        );
        if (!board) return;

        // find list in the board by it temp id
        const list = board.lists.find(
          (list) => list._id === action.payload.tempId
        );
        if (!list) return;
        // update temp list id for a DB list id
        list._id = action.payload.list._id;
      })
      .addCase(addListThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addBoardThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBoardThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        // update board._id from temp to DB id
        const board = state.boards.find(
          (board) => board._id === action.payload.tempId
        );
        board._id = action.payload.board._id;
      })
      .addCase(addBoardThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
//const { sourceListId, targetListId, cardId } = req.body;

export const { moveCard, addCard, addList, addBoard } = homeScreenSlice.actions;
export default homeScreenSlice.reducer;

// following section is dedicated to memoised selector functions returned by "reselect" library

// define input selectors for listDataSelector used inside List.js

const getBoards = (state) => state.homeScreen.boards;
// following two input selectors use props passed to List component from Board component
const getBoardId = (_, boardId) => boardId;
const getListId = (_, listId) => listId;

export const listDataSelector = createSelector(
  getBoards,
  getBoardId,
  getListId,
  (boards, boardId, listId) => {
    console.log(`boards below`);
    console.log(boards);

    console.log(`boardId below`);
    console.log(boardId);

    console.log(`listId below`);
    console.log(listId);

    const board = boards.find((board) => board._id === boardId);
    // console.log('Found board:', board);
    if (!board) return { cards: [], name: "" };

    const list = board.lists.find((list) => list._id === listId);
    // console.log('Found list:', list);
    if (!list) return { cards: [], name: "" };

    return { cards: list.cards, listName: list.name };
  }
);
