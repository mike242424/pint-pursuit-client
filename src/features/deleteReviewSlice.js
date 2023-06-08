import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL;

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ ratingId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        API_URL + `/api/ratings/${ratingId}`,
        createAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const deleteRatingsSlice = createSlice({
  name: "deleteReviews",
  initialState: {
    reviews: [],
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedRatingId = action.payload;
        state.reviews = state.reviews.filter(
          (rating) => rating._id !== deletedRatingId
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default deleteRatingsSlice.reducer;
