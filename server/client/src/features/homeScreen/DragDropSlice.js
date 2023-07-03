import { createSlice } from '@reduxjs/toolkit';

const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState: {
    isDragging: false,
    dragItem: null,
  },
  reducers: {
    startDrag: (state, action) => {
      state.isDragging = true;
      state.dragItem = action.payload;
    },
    stopDrag: (state) => {
      state.isDragging = false;
      state.dragItem = null;
    },
  },
});

export const { startDrag, stopDrag } = dragDropSlice.actions;
export default dragDropSlice.reducer;