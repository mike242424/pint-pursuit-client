import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";
import getBreweriesSlice from "./getBreweriesSlice";

const API_URL = process.env.REACT_APP_BASE_URL + "/api/breweries";

export const deleteBrewery = createAsyncThunk(
  "brewery/deleteBrewery",
  async ({ breweryId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        API_URL + `/${breweryId}`,
        createAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const deleteBrewerySlice = createSlice({
  name: "deleteBrewery",
  initialState: {
    brewery: [],
    deleting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBrewery.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteBrewery.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedBreweryId = action.payload;
        state.brewery = state.brewery.filter(
          (brewery) => brewery._id !== deletedBreweryId
        );
      })

      .addCase(deleteBrewery.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default deleteBrewerySlice.reducer;
