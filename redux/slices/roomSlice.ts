import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../core/axios';
import { HYDRATE } from 'next-redux-wrapper';

interface Room {
  id: number;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  speakers: any[];
}

export interface RoomState {
  rooms: Room[];
}

const initialState: RoomState = {
  rooms: [],
};

export const fetchRooms = createAsyncThunk('rooms', async (thunkAPI) => {
  const { data } = await axios.get('rooms');
  return data;
});

// export const getRoom = createAsyncThunk('rooms/getOne', async (thunkAPI) => {
//   const { data } = await axios.get(`rooms/${query.id}`);
//   return data;
// });

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (arg: { title: string; type: string }) => {
    const { title, type } = arg;
    const { data } = await axios.post('rooms', {
      title,
      type,
    });
    return data;
  }
);

export const updateSpeakersRoom = createAsyncThunk(
  'rooms/update',
  async (arg: { id: any; speakers: any[] }) => {
    const { id, speakers } = arg;
    const { data } = await axios.patch('rooms', {
      id,
      speakers,
    });
    return data;
  }
);

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, actions) => {
      state.rooms = actions.payload;
    });
    builder.addCase(createRoom.fulfilled, (state, actions) => {
      state.rooms.push(actions.payload);
    });
    builder.addCase(updateSpeakersRoom.fulfilled, (state, actions) => {
      console.log(actions);
      state.rooms.push(actions.payload);
    });
    builder.addCase(HYDRATE, (state, action: any) => {
      state.rooms = action.payload.roomReducer.rooms;
    });
  },
});
export const selectRooms = (state: RoomState) => state.rooms;
// export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
