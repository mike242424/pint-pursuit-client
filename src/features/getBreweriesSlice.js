import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL + "/api/breweries";

export const fetchBreweries = createAsyncThunk(
  "getBreweries/fetchBreweries",
  async ({ name, city, state }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}?name=${name}&state=${state}&city=${city}&sort_by=name_asc`,
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

const getBreweriesSlice = createSlice({
  name: "getBreweries",
  initialState,
  reducers: {
    updateBreweryList: (state, action) => {
      state.breweries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreweries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreweries.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries = action.payload.breweries;
        state.error = null;
      })
      .addCase(fetchBreweries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateBreweryList } = getBreweriesSlice.actions;
export default getBreweriesSlice.reducer;
