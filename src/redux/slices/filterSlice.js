import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'популярности', sortValue: 'rating' },
  curentPage: 1,
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
    setCurentPage(state, action) {
      state.curentPage = action.payload;
    },
    setFilter(state, action) {
      state.curentPage = Number(action.payload.curentPage);
      state.activeCategorie = Number(action.payload.categoryId);
      state.sortList = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortList, setCurentPage, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
