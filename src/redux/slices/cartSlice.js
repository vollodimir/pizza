import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  ithems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIthems(state, action) {
      const findIthem = state.ithems.find((obj) => obj.id === action.payload.id);
      findIthem ? findIthem.count++ : state.ithems.push({ ...action.payload, count: 1 });

      state.totalPrice = state.ithems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
    },
    minusIthems(state, action) {
      const findIthem = state.ithems.find((obj) => obj.id === action.payload.id);
      if (findIthem && findIthem.count > 0) {
        findIthem.count--;
        state.totalPrice = state.ithems.reduce((sum, obj) => state.totalPrice - obj.price, 0);
      }
    },

    removeIthems(state, action) {
      state.ithems = state.ithems.filter((obj) => obj.id !== action.payload);
    },
    clearIthems(state) {
      state.ithems = [];
      state.totalPrice = 0;
    },
  },
});

//селектор
export const selectCart = (state) => state.cartSlice;

export const selectCartById = (id) => (state) =>
  state.cartSlice.ithems.find((obj) => obj.id === id);

export const { addIthems, removeIthems, minusIthems, clearIthems } = cartSlice.actions;

export default cartSlice.reducer;
