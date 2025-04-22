// datVeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const datVeSlice = createSlice({
  name: 'datVe',
  initialState: {
    veTaus: [],
    thongTinVeTau: {}
  },
  reducers: {
    setVeTaus: (state, action) => {
      state.veTaus = action.payload;
    },
    setThongTinVeTau: (state, action) => {
      state.thongTinVeTau = action.payload;
    },
    clearVeTaus: (state) => {
      state.veTaus = [];
      state.thongTinVeTau = {};
    },
  },
});

export const { setVeTaus, setThongTinVeTau, clearVeTaus } = datVeSlice.actions;
export default datVeSlice.reducer;