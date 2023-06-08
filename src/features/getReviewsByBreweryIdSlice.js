import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = "http://localhost:3001/api/ratings";

const fetchReviewsByBreweryId = createAsyncThunk(
  "reviews/fetchByBreweryId",
  async (breweryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}?breweryId=${breweryId}`,
        createAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByBreweryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsByBreweryId.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
        state.error = null;
      })
      .addCase(fetchReviewsByBreweryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: reviewsReducer } = reviewsSlice;
export { fetchReviewsByBreweryId };
export default reviewsSlice.reducer;
