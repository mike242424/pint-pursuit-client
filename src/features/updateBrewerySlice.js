import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthHeader } from "../common/utils/createAuthHeader";

const API_URL = process.env.REACT_APP_BASE_URL + "/api/breweries";

export const updateBrewery = createAsyncThunk(
  "brewery/updateBrewery",
  async ({
    breweryId,
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
      const response = await axios.patch(
        API_URL + `/${breweryId}`,
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

const updateBrewerySlice = createSlice({
  name: "updateBrewery",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBrewery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBrewery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBrewery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default updateBrewerySlice.reducer;
