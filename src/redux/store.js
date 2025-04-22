import { configureStore } from "@reduxjs/toolkit";
import chuyenTauSlice from "./Slices/ChuyenTauSlice";
import datVeReducer from "./Slices/DatVeSlice"
const store = configureStore({
    reducer: {
      chuyenTau : chuyenTauSlice,
      datVe: datVeReducer,
    },
  });
  
  export default store;