import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, id } = action.payload;
      state.items = [...state.items, { item, id }];
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    editItem: (state, action) => {
      const { id, editedItem, isEdit } = action.payload;
      if (isEdit) {
        state.items = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, isEdit: true };
          }
          return item;
        });
      } else {
        state.items = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, item: editedItem, isEdit: false };
          }
          return item;
        });
      }
    },

    checkItem: (state, action) => {
      const id = action.payload;

      state.items = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, isCheck: item?.isCheck ? false : true };
        }
        return item;
      });
    },
  },
});
export const { addItem, deleteItem, editItem, checkItem } = itemSlice.actions;
export default itemSlice.reducer;
