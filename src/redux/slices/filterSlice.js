import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortList(state, action) {
      state.sort = action.payload;
    },
    setCurentPage(state, action) {
      state.curentPage = action.payload;
    },
    setFilter(state, action) {
      state.curentPage = Number(action.payload.curentPage);
      state.categoryId = Number(action.payload.activeCategorie);
      state.sort = action.payload.sort;
    },
  },
});

//селектор
export const selectFilter = (state) => state.filterSlice;
export const selectSort = (state) => state.filterSlice.sort;
export const selectCatId = (state) => state.filterSlice.categoryId;

export const { setCategoryId, setSortList, setCurentPage, setFilter, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
