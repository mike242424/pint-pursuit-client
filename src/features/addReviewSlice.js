import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL + +"/api/ratings";

export const addReview = createAsyncThunk(
  "ratings/addReview",
  async ({ breweryId, rating, review }) => {
    try {
      const response = await axios.post(
        API_URL + `/breweries/${breweryId}`,
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

const initialState = {
  loading: false,
  error: null,
};

const addReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addReviewSlice.reducer;
