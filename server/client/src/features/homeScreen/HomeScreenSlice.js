import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createThunk from "../utilities/createThunk";
const apiBaseURL = process.env.REACT_APP_API_URL;

const initialState = {
  boards: []
};

// requests to add card in DB and replaces redux card's tempId with DB card._id
export const getUserBoardsThunk = createThunk(
  "homeScreen/getUserBoardsThunk",
  `${apiBaseURL}/api/getUserBoards`,
  "GET"
)

export const addCardThunk = createThunk(
  "homeScreen/addCardThunk",
  `${apiBaseURL}/api/addCard`,
  "POST"
);

export const moveCardThunk = createThunk(
  "homeScreen/moveCardThunk",
  `${apiBaseURL}/api/moveCard`,
  "POST"
);

export const addListThunk = createThunk(
  "homeScreen/addListThunk",
  `${apiBaseURL}/api/addList`,
  "POST"
);

export const addBoardThunk = createThunk(
  "homeScreen/addBoardThunk",
  `${apiBaseURL}/api/addBoard`,
  "POST"
);

export const addCommentThunk = createThunk(
  "homeScreen/addCommentThunk",
  `${apiBaseURL}/api/addComment`,
  "POST"
);

export const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState,
  reducers: {
    signOutHomeScreenSlice: (state) => {
      return initialState;
    },
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
      console.log(`below is redux board from addList reducer:`)
      console.log(board);
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
        lists: [],
      });
    },

    addComment: (state, action) => {
      // find board
      const board = state.boards.find(
        (board) => board._id === action.payload.boardId
      );
      if (!board) return;

      // find list
      const list = board.lists.find(
        (list) => list._id === action.payload.listId
      );
      if (!list) return;

      // find card
      const card = list.cards.find(
        (card) => card._id === action.payload.cardId
      );
      if (!card) return;

      //push comment to comments array within card
      card.comments.push({
        _id: action.payload._id,
        cardId: action.payload.cardId,
        text: action.payload.inputValue,
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserBoardsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserBoardsThunk.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(getUserBoardsThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
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
          (board) => board._id === action.payload.list.board
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
        console.log(action.payload);
        const {tempId, board } = action.payload;
        state.status = "fulfilled";
        state.error = null;
        // update board._id from temp to DB id
        const boardRedux = state.boards.find(
          (board) => board._id === tempId
        );
        boardRedux._id = board._id;
      })
      .addCase(addBoardThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addCommentThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
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
        // find card in the list
        const card = list.cards.find(
          (card) => card._id === action.payload.cardId
        );
        if (!card) return;

        // find comment in the list by its temp Id
        const comment = card.comments.find(
          (comment) => comment._id === action.payload.tempId
        );
        
        // update comment's _id with the new _id from the payload
        comment._id = action.payload.comment._id;
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
  },
});

export const { moveCard, moveCardWithinList, addCard, addList, addBoard, addComment, signOutHomeScreenSlice } =
  homeScreenSlice.actions;

export default homeScreenSlice.reducer;

