import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../core/axios';
import { HYDRATE } from 'next-redux-wrapper';
import { UserData } from '../../pages';

export interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      state.data = action.payload.userReducer.data.data;
    });
  },
});
export const selectUser = (state: UserState) => state.data;
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
