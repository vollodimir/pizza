import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// асинхронний екшен
export const fetchPizzas = createAsyncThunk('users/fetchPizzasStatus', async (params) => {
  const { category, sortBy, searchBy, curentPage } = params;

  const responce = await axios.get(
    `https://62a070c8a9866630f80f15dd.mockapi.io/ithems?&limit=4&page=${curentPage}&${category}&sortBy=${sortBy}${searchBy}`,
  );
  return responce.data;
});

const initialState = {
  ithems: [],
  status: 'loading', // loading, success, error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setIthems(state, action) {
      state.ithems = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.ithems = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.ithems = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.ithems = [];
    },
  },
});

export const selectPizza = (state) => state.pizzaSlice;

export const { setIthems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
