import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchReviewsByBreweryId = createAsyncThunk(
  "getReviews/fetchReviewsByBreweryId",
  async (breweryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_URL + `/api/ratings?breweryId=${breweryId}`,
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
        state.breweries = action.payload;
        state.error = null;
      })
      .addCase(fetchReviewsByBreweryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: reviewsReducer } = reviewsSlice;
export default reviewsSlice.reducer;
