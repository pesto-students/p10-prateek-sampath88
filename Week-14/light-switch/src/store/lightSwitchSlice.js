import { createSlice } from "@reduxjs/toolkit";

export const lightSwitchSlice = createSlice({
  name: "lightSwitch",
  initialState: {
    lightState: true,
  },
  reducers: {
    toggleSwitch: (state) => {
      state.lightState = !state.lightState;
    },
  },
});

export const { toggleSwitch } = lightSwitchSlice.actions;
const lightSwitchReducer = lightSwitchSlice.reducer;
export default lightSwitchReducer;
