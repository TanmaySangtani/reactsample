import { createSlice } from "@reduxjs/toolkit";
import { userdata } from "../Data";
const userSlice = createSlice({
  name: "users",
  initialState: userdata,
  reducers: {
    adduser: (state, action) => {
      //console.log(action);
      state.push(action.payload);
    },
    updateuser: (state, action) => {
      const { id, name, description } = action.payload;
      const userinfo = state.find((user) => user.id == id);
      if (userinfo) {
        userinfo.name = name;
        userinfo.description = description;
      }
      console.log(userinfo);
    },
    deleteuser: (state, action) => {
      const { id } = action.payload;
      const userinfo = state.find((user) => user.id == id);
      if (userinfo) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});
export const { adduser, updateuser, deleteuser } = userSlice.actions;
export default userSlice.reducer;
