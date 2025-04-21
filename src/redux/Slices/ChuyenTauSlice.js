import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Sử dụng biến môi trường hoặc fallback về localhost nếu không có
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// Async thunk: Lấy danh sách chuyến tàu
export const fetchChuyenTaus = createAsyncThunk(
  "chuyenTau/fetchChuyenTaus",
  async (_, { rejectWithValue }) => {
    console.log("Bắt đầu gọi API chuyến tàu");
    try {
      const response = await axios.get(`${API_URL}/api/chuyentau/get/all`);
      console.log("Data chuyến tàu:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API chuyến tàu:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchChuyenTau = createAsyncThunk(
  "chuyenTau/searchChuyenTau",
  async ({ gaDi, gaDen, ngayKhoiHanh }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      if (gaDi) query.append("gaDi", gaDi);
      if (gaDen) query.append("gaDen", gaDen);
      if (ngayKhoiHanh) query.append("ngayKhoiHanh", ngayKhoiHanh);
      
      const response = await axios.get(`${API_URL}/api/chuyen-tau/search?${query.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const chuyenTauSlice = createSlice({
  name: "chuyenTau",
  initialState: {
    chuyenTaus: [],
    loading: false,
    error: null,
    search: {
      gaDi: "",
      gaDen: "",
      ngayKhoiHanh: "",
    },
    searchResults: []
  },
  reducers: {
    setFilters: (state, action) => {
      state.search = { ...state.search, ...action.payload };
    },
    clearFilters: (state) => {
      state.search = {
        gaDi: "",
        gaDen: "",
        ngayKhoiHanh: "",
      };
    },
    resetChuyenTauError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchChuyenTaus
      .addCase(fetchChuyenTaus.pending, (state) => {
        console.log("Pending: Đang tải dữ liệu chuyến tàu");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChuyenTaus.fulfilled, (state, action) => {
        console.log("Fulfilled: Đã nhận dữ liệu chuyến tàu", action.payload);
        state.loading = false;
        state.chuyenTaus = action.payload;
      })
      .addCase(fetchChuyenTaus.rejected, (state, action) => {
        console.error("Rejected: Lỗi khi tải dữ liệu chuyến tàu", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      
      // Xử lý searchChuyenTau
      .addCase(searchChuyenTau.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchChuyenTau.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchChuyenTau.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setFilters, 
  clearFilters, 
  resetChuyenTauError,
  clearSearchResults 
} = chuyenTauSlice.actions;

export default chuyenTauSlice.reducer;