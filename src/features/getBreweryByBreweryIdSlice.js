import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchBreweryByBreweryId = createAsyncThunk(
  "getBrewery/fetchBreweryByBreweryId",
  async (breweryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_URL + `/api/breweries/${breweryId}`,
        createAuthHeader()
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  breweries: [],
  loading: false,
  error: null,
};

const breweryByBreweryIdSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweryByBreweryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreweryByBreweryId.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries = action.payload;
        state.error = null;
      })
      .addCase(fetchBreweryByBreweryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: breweryByIdReducer } = breweryByBreweryIdSlice;
export default breweryByBreweryIdSlice.reducer;
