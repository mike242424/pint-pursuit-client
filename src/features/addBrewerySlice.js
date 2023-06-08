import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL;

export const addBrewery = createAsyncThunk(
  "brewery/addBrewery",
  async ({
    name,
    address,
    city,
    state,
    zipCode,
    country,
    longitude,
    latitude,
    phone,
    websiteUrl,
  }) => {
    try {
      const response = await axios.post(
        API_URL + "/api/breweries",
        {
          name,
          address,
          city,
          state,
          zipCode,
          country,
          longitude,
          latitude,
          phone,
          websiteUrl,
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
  breweries: [],
  loading: false,
  error: null,
};

const addBrewerySlice = createSlice({
  name: "brewery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrewery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBrewery.fulfilled, (state, action) => {
        state.loading = false;
        state.breweries.push(action.payload);
      })
      .addCase(addBrewery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addBrewerySlice.reducer;
