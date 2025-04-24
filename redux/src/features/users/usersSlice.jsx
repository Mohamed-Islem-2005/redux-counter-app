import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "laryn" },
  { id: "3", name: "mohamed islem" },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});


export const selectAllUsers = (state)=>state.users;

export default userSlice.reducer;