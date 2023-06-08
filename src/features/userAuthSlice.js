import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../common/services/auth.service";

const userData = JSON.parse(localStorage.getItem("token"));

const user = userData ? userData : null;

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, username, password }) => {
    try {
      const response = await AuthService.signup(email, username, password);
      return response;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      throw new Error(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const response = await AuthService.login(username, password);
      return response;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      throw new Error(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

const initialState = {
  isLoggedIn: user ? true : false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.signupError = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.signupError = action.error.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loginError = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.loginError = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.loginError = null;
    });
  },
});

export default userAuthSlice.reducer;
