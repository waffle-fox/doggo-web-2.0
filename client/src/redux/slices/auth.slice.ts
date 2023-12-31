import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import * as types from "./types";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData: types.IReqData) => {
    const { data } = await axios.post("auth/register", userData);
    return data;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: types.IReqData) => {
    console.log("userData", userData);
    const { data } = await axios.post("auth/login", userData);

    return data;
  },
);

export const getMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("auth/me");

  console.log(data);

  return data;
});

const initialState: types.IinitialState = {
  token: null,
  data: null,
  status: types.Status.idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.status = types.Status.fulfilled;
    });
    builder.addCase(createUser.rejected, state => {
      state.status = types.Status.rejected;
    });
    builder.addCase(createUser.pending, state => {
      state.status = types.Status.pending;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.status = types.Status.fulfilled;
    });
    builder.addCase(loginUser.rejected, state => {
      state.status = types.Status.rejected;
    });
    builder.addCase(loginUser.pending, state => {
      state.status = types.Status.pending;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = types.Status.fulfilled;
    });
    builder.addCase(getMe.rejected, state => {
      state.status = types.Status.rejected;
    });
    builder.addCase(getMe.pending, state => {
      state.status = types.Status.pending;
    });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const { actions, reducer } = authSlice;
