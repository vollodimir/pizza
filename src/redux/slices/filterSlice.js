import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'популярности', sortValue: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortList(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSortList } = filterSlice.actions;

export default filterSlice.reducer;
