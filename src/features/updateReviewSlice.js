import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = "http://localhost:3001/api/ratings";

export const updateReview = createAsyncThunk(
  "ratings/addReview",
  async ({ ratingId, rating, review }) => {
    try {
      const response = await axios.patch(
        API_URL + `/${ratingId}`,
        {
          rating,
          review,
        },
        createAuthHeader()
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const updateReviewSlice = createSlice({
  name: "updateReview",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default updateReviewSlice.reducer;
