import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import createThunk from "../utilities/createThunk";

const initialState = {
  user: {
    _id: "sf24d",
    firstName: "Yegor",
    lastName: "Rodin",
    orgId: "64a720b83b8a0cd93ea4f327",
    orgName: "Parsity",
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
            { _id: "sdfff", name: "List 1 Card 1", index: 0 },
            { _id: "234dd", name: "List 1 Card 2", index: 1 },
            { _id: "dgdsf", name: "List 1 Card 3", index: 2 },
            { _id: "gsf32", name: "List 1 Card 4", index: 3 },
          ],
        },
        {
          _id: "34rfc",
          name: "Doing",
          cards: [
            { _id: "vvbbh", name: "List 2 Card 1", index: 0 },
            { _id: "9idfd", name: "List 2 Card 2", index: 1 },
            { _id: "00233", name: "List 2 Card 3", index: 2 },
            { _id: "vdfv4", name: "List 2 Card 4", index: 3 },
          ],
        },
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
            { _id: "vvbbh", name: "Attend Meetup", index: 1 },
            { _id: "9idfd", name: "Follow up with CTO", index: 2 },
            { _id: "00233", name: "Post on LinkedIn", index: 3 },
            { _id: "vdfv4", name: "Speak at a Conference", index: 4 },
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
      const { boardId, sourceListId, targetListId, cardId } = action.payload;

      const board = state.boards.find((board) => board._id === boardId);
      if (!board) return;

      // find source list
      const sourceList = board.lists.find((list) => list._id === sourceListId);
      if (!sourceList) return;

      // find target list
      const targetList = board.lists.find((list) => list._id === targetListId);
      if (!targetList) return;

      // find the moved card in the source list
      const movedCard = sourceList.cards.find((card) => card._id === cardId);
      if (!movedCard) return;

      // remove the moved card from the source list
      sourceList.cards = sourceList.cards.filter((card) => card._id !== cardId);

      // add card to target list
      targetList.cards.push(movedCard);

      return state;
    },

    moveCardWithinList: (state, action) => {
      const { sourceIndex, targetIndex, listId, boardId } = action.payload;
    
      // find board
      const board = state.boards.find((board) => board._id === boardId);
      if (!board) return;
    
      // find list
      const list = board.lists.find((list) => list._id === listId);
      if (!list) return;
    
      // pull out the card from the source position
      const [movedCard] = list.cards.splice(sourceIndex, 1);
      if (!movedCard) return;
    
      // insert the moved card at the target position
      list.cards = [...list.cards.slice(0, targetIndex), movedCard, ...list.cards.slice(targetIndex)];
    
      return state;
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
        console.log("no board found inside addList reducer!");
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

export const { moveCard, moveCardWithinList, addCard, addList, addBoard } =
  homeScreenSlice.actions;
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
