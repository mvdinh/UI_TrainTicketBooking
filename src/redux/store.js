import { configureStore } from "@reduxjs/toolkit";
import chuyenTauSlice from "./Slices/ChuyenTauSlice";
const store = configureStore({
    reducer: {
      chuyenTau : chuyenTauSlice,
    },
  });
  
  export default store;